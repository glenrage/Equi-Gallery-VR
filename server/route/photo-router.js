'use strict';

const fs = require('fs');
const path = require('path');

const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('equi-gallery:photo-router');
const bearerAuth = require('../lib/error-middleware.js');

const Photo = require('../model/photo-model.js');
const User = require('../model/user-model.js');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});
const s3UploadPromise = require('../lib/s3-upload-promise.js');
const photoRouter = module.exports = require('express').Router();

photoRouter.post('/api/:userID/photo', bearerAuth, upload.single('file'), function(req, res, next) {
  debug('POST /api/:userID/photo');

  if(!req.file)
    return next(createError(400, 'file not found'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  let tempUser, tempPhoto;
  User.findById(req.params.userID)
    .catch(err => Promise.reject(createError(404, err.message)))
    .then(user => {
      console.log('user ' + user)
      tempUser = user;
      return s3UploadPromise(params);
    })
    .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
    .then(s3data => {
      del([`${dataDir}/*`]);
      let photoData = {
        desc: req.body.desc,
        objectKey: s3data.Key,
        imageURI: s3data.Location,
        userID: req.body.userID,
      };
      return new Photo(photoData).save();
    })
    .then(() => res.json(tempPhoto))
    .catch(err => {
      del([`${dataDir}/*`]);
      next(err);
    });
});

photoRouter.delete('/api/:userID/photo/:photoID', bearerAuth, function(req, res, next) {
  debug('DELETE /api/:userID/photo/:photoID');

  let tempPhoto;
  Photo.findById(req.params.photoID)
  .then(photo => {
    if(photo.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'user not authorized to delete this pic'));
    tempPhoto = photo;
    return User.findById(req.params.userID);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then(user => {
    user.pics = user.pics.filter(id => {
      if(id === req.params.photoID) return false;
      return true;
    });
    return user.save() ;
  })
  .then(() => {
    let params = {
      Bucket: process.env.AWS_BUCKET,
      Key: tempPhoto.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
  .then(() => {
    return Photo.findByIdAndRemove(req.params.photoID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});

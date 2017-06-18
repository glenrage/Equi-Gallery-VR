'use strict';

const fs = require('fs');
const path = require('path');

const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('equi-gallery:photo-router');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const Photo = require('../model/photo-model.js');
const User = require('../model/user-model.js');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});
const s3UploadPromise = require('../lib/s3-upload-promise.js');
const photoRouter = module.exports = require('express').Router();

photoRouter.post('/api/photo', bearerAuth, upload.single('image'), function(req, res) {
  debug('POST /api/photo');

  if (!req.file) return createError(400, 'Resource required');
  if (!req.file.path) return createError(500, 'File not saved');

  let tempPhoto, tempUser;
  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  return User.findById(req.user._id)
  .then(user => {
    tempUser = user;
    return s3UploadPromise(params);
  })
  .then(s3Data => {
    del([`${dataDir}/*`]);
    let photoData = {
      name: req.body.name,
      desc: req.body.desc,
      username: req.user.username,
      userID: req.user._id,
      imageURI: s3Data.Location,
      objectKey: s3Data.Key,
    };
    return new Photo(photoData).save();
  })
  .then(photo => {
    tempPhoto = photo;
    tempUser.photos.push(photo._id);
    return User.findByIdAndUpdate(req.user._id, tempUser, {new: true});
  })
  .then(() => res.json(tempPhoto))
  .catch(err => res.send(err));
});

photoRouter.delete('/api/gallery/:galleryID/pic/:picID', bearerAuth, function(req, res, next) {
  debug('DELETE /api/gallery/:galleryID/pic/:picID');

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

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
const Gallery = require('../model/gallery-model.js');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});
const s3UploadPromise = require('../lib/s3-upload-promise.js');
const photoRouter = module.exports = require('express').Router();

photoRouter.post('/api/gallery/:galleryID/photo', bearerAuth, upload.single('file'), function(req, res, next) {
  debug('POST /api/gallery/:galleryID/pic');

  if(!req.file)
    return next(createError(400, 'file not found'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  let tempGallery, tempPhoto;
  Gallery.findById(req.params.galleryID)
    .catch(err => Promise.reject(createError(404, err.message)))
    .then(gallery => {
      tempGallery = gallery;
      return s3UploadPromise(params);
    })
    .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
    .then(s3data => {
      del([`${dataDir}/*`]);
      let photoData = {
        name: req.body.name,
        username: req.user.username,
        desc: req.body.desc,
        objectKey: s3data.Key,
        imageURI: s3data.Location,
        userID: req.user._id,
      };
      return new Photo(photoData).save();
    })
    .then(() => res.json(tempPhoto))
    .catch(err => {
      del([`${dataDir}/*`]);
      next(err);
    });
});

photoRouter.delete('/api/gallery/:galleryID/pic/:picID', bearerAuth, function(req, res, next) {
  debug('DELETE /api/gallery/:galleryID/pic/:picID');

  let tempPhoto;
  Photo.findById(req.params.photoID)
  .then(photo => {
    if(photo.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'user not authorized to delete this pic'));
    tempPhoto = photo;
    return Gallery.findById(req.params.galleryID);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then(gallery => {
    gallery.pics = gallery.pics.filter(id => {
      if(id === req.params.photoID) return false;
      return true;
    });
    return gallery.save() ;
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

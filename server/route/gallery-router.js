'use strict';

const AWS = require('aws-sdk');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('equiGalleryVR:galleryRouter');

const Photo = require('../model/photo-model');
const Gallery = require('../model/gallery-model');
const bearerAuth = require('../lib/bearer-auth-middleware');

const s3 = new AWS.S3();
const galleryRouter = module.exports = Router();

galleryRouter.post('/api/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/gallery');
  req.body.userID = req.user._id;
  req.body.username = req.user.username;
  new Gallery(req.body).save()
  .then(gallery => res.json(gallery))
  .catch(next);
});

galleryRouter.put('/api/gallery/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT /api/gallery/:id');
  Gallery.findById(req.params.id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(gallery => {
    if (gallery.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'not this user\'s gallery'));
    let options = {runValidators: true, new: true};
    return Gallery.findByIdAndUpdate(req.params.id, req.body, options);
  })
  .then(gallery => res.json(gallery))
  .catch(next);
});

galleryRouter.get('/api/gallery', function(req, res, next) {
  debug('GET /api/gallery');
  Gallery.find({})
  .populate('photos')
  .then(galleries => res.json(galleries))
  .catch(next);
});

galleryRouter.get('/api/gallery/:id', function(req, res, next) {
  debug('GET /api/gallery');
  Gallery.findById(req.params.id)
  .populate('photos')
  .then(gallery => res.json(gallery))
  .catch(next);
});

galleryRouter.delete('/api/gallery/:id', function(req, res, next) {
  debug('POST /api/gallery');
  let tempGallery = null;
  Gallery.findById(req.params.id)
  .populate('photos')
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(gallery => {
    tempGallery = gallery;
    if (gallery.userID.toString() !== req.user._id)
      return Promise.reject(createError(404, 'not this user\'s gallery!'));
    let deletePhotos = [];
    gallery.photos.forEach(photo => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: photo.objectKey,
      };
      deletePhotos.push(Photo.findByIdAndRemove(photo._id));
      deletePhotos.push(s3.deleteObject(params).promise());
    });
    return Promise.all(deletePhotos);
  })
  .then(() => tempGallery.remove())
  .then(() => res.sendStatus(204))
  .catch(next);
});

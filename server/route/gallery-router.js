'use strict';

const debug = require('debug')('equiGalleryVR:galleryRouter');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;

const galleryRouter = module.exports = Router();

galleryRouter.post('/api/gallery', jsonParser, function(req, res, next) {
  debug('POST /api/gallery');
  res.send(req);
});

galleryRouter.put('/api/gallery/:id', jsonParser, function(req, res, next) {
  debug('PUT /api/gallery');
  res.send(req);
});

galleryRouter.get('/api/gallery/:id', function(req, res) { // add 'next' parameter when we implement middleware
  debug('GET /api/gallery');
  res.send(req);
});

galleryRouter.delete('/api/gallery/:id', function(req, res) { // add 'next' parameter when we implement middleware
  debug('POST /api/gallery');
  res.send();
});

'use strict';

const fs = require('fs');
const path = require('path');

const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('equi-gallery:user-router');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const Photo = require('../model/photo-model.js');
const User = require('../model/user-model.js');

AWS.config.setPromisesDependency(require('bluebird'));

const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});
const s3UploadPromise = require('../lib/s3-upload-promise.js');
const s3DeletePromise = require('../lib/s3-delete-promise.js');
const userRouter = module.exports = require('express').Router();

userRouter.get('/api/user', function(req, res, next) {
  debug('GET /api/user');
  User.find({})
  .populate('photos')
  .then(user => res.json(user))
  .catch(next);
});

userRouter.delete('/api/user/')

'use strict';

const AWS = require('aws-sdk');
const debug = require('debug')('equi-gallery:s3-upload-promise');
const s3 = new AWS.S3();

module.exports = function s3UploadPromise(params) {
  debug('uploading file to S3');

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3Data) => {
      if (err) return reject(err);
      resolve(s3Data);
    });
  });
};
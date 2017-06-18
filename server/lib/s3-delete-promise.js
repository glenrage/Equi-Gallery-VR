'use strict';

const AWS = require('aws-sdk');
const debug = require('debug')('equi-gallery:s3-delete-promise');
const s3 = new AWS.S3();

module.exports = function s3UploadPromise(params) {
  debug('deleting file from S3');

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, s3Data) => {
      if (err) return reject(err);
      resolve(s3Data);
    });
  });
};

'use strict';

require('./lib/test-env.js');
let awsMocks = require('./lib/aws-mocks.js');

const expect = require('chai').expect;
const s3UploadPromise = require('../server/lib/s3-upload-promise.js');

describe('testing s3UploadPromise', function(){
  describe('with valid input', function(){
    it('should return an aws response', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'yo',
        Body: 'sup',
        ACL: 'public-read',
      };

      s3UploadPromise(params)
      .then(data => {
        let uploadMock = awsMocks.uploadMock;
        expect(data.ETag).to.equal(uploadMock.ETag);
        expect(data.Location).to.equal(uploadMock.Location);
        expect(data.Key).to.equal(uploadMock.key);
        done();
      })
      .catch(done);
    });
  });

  describe('with no ACL', function(){
    it('should return an error', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'yoooo',
        Body: 'sup',
      };

      s3UploadPromise(params)
      .then(done)
      .catch(err => {
        expect(err.message).to.equal('ACL must be public read');
        done();
      });
    });
  });

  describe('with no key', function(){
    it('should return an aws response', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Body: 'sup',
        ACL: 'public-read',
      };

      s3UploadPromise(params)
      .then(done)
      .catch(err => {
        expect(err.message).to.equal('requires Key');
        done();
      });
    });
  });

  describe('with no body', function(){
    it('should return an aws response', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'yooo',
        ACL: 'public-read',
      };

      s3UploadPromise(params)
      .then(done)
      .catch(err => {
        expect(err.message).to.equal('requires Body');
        done();
      });
    });
  });
});

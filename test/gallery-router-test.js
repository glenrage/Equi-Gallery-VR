'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const serverCtrl = require('./lib/server-controller');
const url = `http://localhost:${process.env.PORT}`;

describe('Testing api/gallery', function() {
  // start the server for this test file
  before(done => serverCtrl.serverUp());
  // stop the server after this test file
  describe('#GET api/gallery', () => {
    it('should respond with status 200', done => {
      superagent.get()
      done();
    });
  });

  describe('#POST api/gallery', () => {
    it('should respond with status 201', done => {

      done();
    });
  });

  describe('#PUT api/gallery', () => {
    it('should respond with status 200', done => {

      done();
    });
  });

  describe('#DELETE api/gallery', () => {
    it('should respond with status 204', done => {

      done();
    });
  });
});

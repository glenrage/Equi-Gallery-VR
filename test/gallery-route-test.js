'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const server = require('../server.js');
const mockGallery = require('./lib/mock-gallery.js');
const serverCtrl = require('./lib/server-ctrl');
const cleanDB = require('./lib/clean-db.js');
const url = `http://localhost:${process.env.PORT}`;

describe.only('Testing api/gallery', function() {
  // start the server for this test file
  before(done => serverCtrl.serverUp(server, done));
  // stop the server after this test file
  after(done => serverCtrl.serverDown(server, done));
  // clean out DB after each describe block
  // afterEach(done => cleanDB(done));
  describe('#GET api/gallery/:id', () => {
    it('should respond with status 200', done => {
      superagent.get(`${url}/api/gallery/${1234}`)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
      done();
    });
    it('should retrieve a gallery with matching id', done => {
      superagent.get(`${url}/api/gallery/${1234}`)
      .send()
      .end((err, res) => {
        expect(res.body.id).to.equal(1234);
      });
      done();
    });
  });

  describe('#POST api/gallery', () => {
    describe('with a valid token and body', () => {

    });
    it('should respond with status 201', done => {
      superagent.post(`${url}/api/gallery`)
      .send(mockGallery)
      .end((err, res) => {
        expect(res.status).to.equal(201);
      });
      done();
    });
    it('should respond with a gallery object', done => {
      superagent.post(`${url}/api/gallery`)
      .send(mockGallery)
      .end((err, res) => {
        expect(res.body).to.be.instanceOf(Object);
      });
      done();
    });
  });

  describe('#PUT api/gallery/:id', () => {
    it('should respond with status 201', done => {
      superagent.put(`${url}/api/gallery/${}`)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(201);
      });
      done();
    });
  });

  describe('#DELETE api/gallery/:id', () => {
    it('should respond with status 204', done => {
      superagent.delete(`${url}/api/gallery/${}`)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(204);
      });
      done();
    });
  });
});

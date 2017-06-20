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

const exampleUser = {
  username: 'glenrage',
  password: '12345678',
  email: 'glen@glenrage.com',
};


describe.only('testing api/user route', function() {
  //start the server
  before(done => serverCtrl.serverUp(server, done));
  //stop the server
  after(done => serverCtrl.serverDown(server, done));
  //flush database before each describe block
  describe('#GET api/user/:id', () => {
    it('should respond with a 200 status', done => {
      superagent.get(`${url}/api/user/${12345}`)
      .send()
      .end((err, res) => {
        expect(res.body.id).to.equal(12345);
      });
      done();
    });
  });

  describe('#POST api/user', () => {
    it('should respond with a 201 status', done => {
      superagent.post(`${url}/api/user`)
      .send(exampleUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
      });
      done();
    });
    it('should respond with a user object', done => {
      superagent.post(`${url}/api/user`)
      .send(exampleUser)
      .end((err, res) => {
        expect(res.body).to.be.instanceOf(Object);
      });
      done();
    });
  });

  describe('#PUT api/user', () => {
    it('should respond with a 201 status', done => {
      superagent.put(`${url}/api/user/${12345}`)
      .send(exampleUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
      });
      done();
    });
  });

  describe('#DELETE api/user', () => {
    it('should respond with a 204 status', done => {
      superagent.delete(`${url}/api/user/${12345}`)
      .send(exampleUser)
      .end((err, res) => {
        expect(res.status).to.equal(204);
      });
      done();
    });
  });
});

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const mockUser = require('./lib/mock-user.js');
const cleanDb = require('./lib/clean-db.js');
const serverCtrl = require('./lib/server-ctrl.js');

mongoose.Promise = Promise;

const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'glenrage',
  password: '12345678',
  email: 'glen@glenrage.com',
};

describe('testing auth-router', function() {

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDb(done));

  describe('testing POST method /api/signup', function() {
    describe('with valid body parameters', function() {
      it('should return a token', (done) => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.text).to.equal(true);
          done();
        });
      });

      describe('with no username', function() {
        it('should respond with a status 400', (done) => {
          request.post(`${url}/api/signup`)
          .send({
            password: exampleUser.password,
            email: exampleUser.email,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
        });
      });

      describe('with username < 5', function() {
        it('should respond with status 400', (done) => {
          request.post(`${url}/api/signup`)
          .send({
            username: 'test',
            password: exampleUser.password,
            email: exampleUser.email,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
        });
      });

      describe('with duplicate username', function() {
        before(done => mockUser.call(this, done));
        it('should respond with a 409 error', (done) => {
          request.post(`${url}/api/signup`)
          .send({
            username: this.tempUser.username,
            password: exampleUser.password,
            email: exampleUser.email,
          })
          .end((err, res) => {
            expect(res.status).to.equal(409);
            done();
          });
        });
      });

      describe('with duplicate email', function() {
        before(done => mockUser.call(this, done))
      })



    });
  });




















});

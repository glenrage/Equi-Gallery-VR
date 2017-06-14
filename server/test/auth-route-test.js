const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const mockUser = require('./lib/mock-user.js');
const cleanDB = require('./lib/clean-db.js');

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

  afterEach(done => scrubDb(done));

});

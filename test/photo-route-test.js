'use strict';

//mocks third party services
require('./lib/test-env/js');
const awsMocks = require('./lib/aws-mocks.js');

//npm modules
const expect = require('chai').expect;
const request = require('superagent');

//app modules

const mockPhoto = require('./lib/mock-photo.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');
const serverCtrl = require('./lib/server-ctrl.js');
// const galleryMock = require('./lib/gallery-mock');

//module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`

const examplePic = {
  name: 'yolo',
  desc: 'you only live once',
  file: `${__dirname}/data/shield.png`,
};

describe('testing pic-router', function(){
  //starts server before all tests
  before(done => serverCtrl.serverUp(server,done));
  //stops server before all tests
  after(done => serverCtrl.serverDown(server,done));
  //removes all models from database after every test
  afterEach(done => cleanDB(done));

  describe('testing post')





});

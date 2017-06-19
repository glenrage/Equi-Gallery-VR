'use strict';

//npm modules
const debug = require('debug')('slugram:pic-mock');

//app modules
const Pic = require('../../server/model/photo-model.js');
const awsMocks = require('./aws-mocks.js');
const userMock = require('./mock-user.js');

module.exports = function(done){
  debug('creating mock pic');
  let desc = 'this is a test photo';
  let examplePicData = {
    desc,
    created: new Date(),
    imageURI: awsMocks.uploadMock.Location,
    objectKey: awsMocks.uploadMock.key,
  };

  userMock.call(this, err => {
    if (err) return done(err);
    examplePicData.username = this.tempUser.username;
    examplePicData.userID = this.tempUser._id.toString();
    new Pic (examplePicData).save()
    .then(photos => {
      this.tempPic = photos;
      done();
    })
    .catch(done);
  });
};

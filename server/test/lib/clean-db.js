'use strict';

const debug = require('debug')('equi-gallery-clean-db');
const Pic = require('../../model/photo-model.js');
const User = require('../../model/user-model.js');
const Gallery = require('../../model/gallery-model.js');

module.exports = function(done) {
  debug('scrub database');
  Promise.all([
    Pic.remove({}),
    User.remove({}),
    Gallery.remove({}),
  ])
  .then( () => done())
  .catch(done);
};

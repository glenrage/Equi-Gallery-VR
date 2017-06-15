'use strict';

const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  username: {type: String, required: true},
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0},
  created: {type: Date, required: true, default: Date.now},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'photo'}],
});

module.exports = mongoose.model('gallery', gallerySchema);

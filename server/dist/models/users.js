'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  timezone: {
    type: String,
    required: true
  },
  pass_digest: {
    type: String,
    required: true
  },
  lastSearch: String
});

module.exports = mongoose.model('UserModel', userSchema);
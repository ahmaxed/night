'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var barSchema = new Schema({
  users: Array,
  yelpId: String
});

module.exports = mongoose.model('BarModel', barSchema);
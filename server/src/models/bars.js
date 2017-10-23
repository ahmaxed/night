var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var barSchema = new Schema({
  users: Array,
  barId: String
});

module.exports = mongoose.model('BarModel', barSchema);

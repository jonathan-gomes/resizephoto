'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoDataSchema = new Schema({
  url: {
    type: String
  },small: {
    type: String
  },medium: {
    type: String
  },large: {
    type: String
  }
});


module.exports = mongoose.model('PhotoData', PhotoDataSchema);
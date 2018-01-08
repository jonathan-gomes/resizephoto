'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PhotoSchema = new Schema({
  url: {
    type: String
  }
  ,smallFormat: {
    type: String
  }
  ,smallUrl: {
    type: String
  }
  ,mediumFormat: {
    type: String
  }
  ,mediumUrl: {
    type: String
  }
  ,largeFormat: {
    type: String
  }
  ,largeUrl: {
    type: String
  }
});


module.exports = mongoose.model('Photos', PhotoSchema);
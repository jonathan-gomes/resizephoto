'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Redimens = new Schema({
    url: {
      type: String
    },
    format: {
      type: String
    }
  });
  
module.exports = mongoose.model('Redimens', Redimens);
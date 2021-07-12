
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidosSchema = Schema({
  jornada:String,
  name:String,
  teamOne:String,
  teamTwo:String,
});

module.exports = mongoose.model('partido', partidosSchema);
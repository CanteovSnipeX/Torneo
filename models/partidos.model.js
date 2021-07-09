
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidosSchema = Schema({
  jornada:String,
  name:String,
  teamOne:String,
  teamOne:String,
});

module.exports = mongoose.model('partido', partidosSchema);
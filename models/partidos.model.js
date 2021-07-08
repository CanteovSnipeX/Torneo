
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidosSchema = Schema({
  jornada:String,
  name:String,
  equipo1:String,
  equipo2:String
});

module.exports = mongoose.model('partido', partidosSchema);
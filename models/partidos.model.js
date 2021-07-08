
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidosSchema = Schema({
  jornadas:String,
  equipo1:String,
  equipo2:String
});

module.exports = mongoose.model('partidos', partidosSchema);
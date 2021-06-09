
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = Schema({
   jornada:String,
   Equipo1:String,
   Equipo2:String,
   resultEquipo:Number,
   resultEquipo1:Number 
});

module.exports = mongoose.model('results', resultsSchema);

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = Schema({
   jornada:String,
   name:String,
   teamOne:String, goles: [Number],
   teamOne:String, goles: [Number],
});

module.exports = mongoose.model('result', resultsSchema);
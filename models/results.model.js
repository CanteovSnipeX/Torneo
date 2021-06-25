
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = Schema({
   jornada:String,
   Equipo1:String,
   Equipo2:String,
   gool: [{type: Schema.ObjectId, ref: 'gool'}]
});

module.exports = mongoose.model('results', resultsSchema);

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = Schema({
   teamOne:String,
   teamTwo:String,
   onegoles:Number,
   twogoles:Number,  
});

module.exports = mongoose.model('result', resultsSchema);
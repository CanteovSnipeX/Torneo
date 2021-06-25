
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goolSchema = Schema({
   resultEquipo:Number,
   resultEquipo1:Number 
});

module.exports = mongoose.model('gool', goolSchema);
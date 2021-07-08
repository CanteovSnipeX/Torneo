
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = Schema({
   name:String,
   nintegrantes:String,
   image:String,
});

module.exports = mongoose.model('grupo', groupSchema);
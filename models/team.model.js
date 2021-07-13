
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
   name:String,
   nintegrantes:String,
   image:String,
   result: [{type: Schema.ObjectId, ref:'result'}],
});

module.exports = mongoose.model('team', teamSchema);
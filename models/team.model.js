
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
   name:String,
   nintegrantes:String,
   image:String,
   report:[{type: Schema.ObjectId, ref:'report'}]
});

module.exports = mongoose.model('team', teamSchema);
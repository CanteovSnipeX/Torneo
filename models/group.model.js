
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = Schema({
   name:String,
   image:String,
   equipo:[{type: Schema.ObjectId, ref: 'equipo'}],
});

module.exports = mongoose.model('grupo', groupSchema);
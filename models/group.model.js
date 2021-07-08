'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ligaSchema = Schema({
   name:String,
   Directors:String,
   image:String,
   grupo: [{type: Schema.ObjectId, ref: 'grupo'}],
   partido: [{type: Schema.ObjectId, ref: 'partido'}] 
   
});

module.exports = mongoose.model('liga', ligaSchema);
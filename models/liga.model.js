'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ligaSchema = Schema({
   name:String,
   Directors:String,
   imagen:String,
   gruop: [{type: Schema.ObjectId, ref: 'gruop'}] 
});

module.exports = mongoose.model('liga', ligaSchema);
'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grupoSchem = Schema({
   name:String,
   Directors:String,
   image:String,
   team: [{type: Schema.ObjectId, ref: 'team'}],
   partido: [{type: Schema.ObjectId, ref: 'partido'}] 
   
});

module.exports = mongoose.model('grupo', grupoSchem);
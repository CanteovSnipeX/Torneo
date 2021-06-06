
'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = Schema({
   name:String,
   imagen:String,
   equipo: [{type: Schema.ObjectId, ref: 'team'}] 
});

module.exports = mongoose.model('group', groupSchema);
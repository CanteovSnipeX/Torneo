'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ligaSchema = Schema({
   name:String,
   Directors:String,
   image:String,
   team: [{type: Schema.ObjectId, ref: 'grupo'}]
    
});

module.exports = mongoose.model('liga', ligaSchema);
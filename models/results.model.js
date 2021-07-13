
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = Schema({
   onegoles:String,
   twogoles:String,
   partido: [{type: Schema.ObjectId, ref: 'partido'}],
   team: [{type: Schema.ObjectId, ref: 'team'}]
});

module.exports = mongoose.model('result', resultsSchema);
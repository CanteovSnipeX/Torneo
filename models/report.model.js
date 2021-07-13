
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = Schema({
   goalsAgainst:Number,
   goalDifference:Number,
   score:Number,
   torneo: [{type: Schema.ObjectId, ref: 'torneo'}],
   team: [{type:Schema.ObjectId, ref:'team'}],
   partido: [{type: Schema.ObjectId, ref: 'partido'}],
   resultado: [{type: Schema.ObjectId, ref:'result'}],
});

module.exports = mongoose.model('report', reportSchema);
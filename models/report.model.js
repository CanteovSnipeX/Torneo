
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = Schema({
   goles:[Number],
   goalsAgainst:Number,
   goalDifference:Number,
   score:Number,
   torneo: [{type: Schema.ObjectId, ref: 'torneo'}],
   team: [{type:Schema.ObjectId, ref:'team'}],
   partido: [{type: Schema.ObjectId, ref: 'partido'}],
});

module.exports = mongoose.model('report', reportSchema);

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = Schema({
   team: [{type:Schema.ObjectId, ref:'team'}],
   partido: [{type: Schema.ObjectId, ref: 'partido'}],
   resultado: [{type: Schema.ObjectId, ref:'result'}],
   goles:Number,
   goalsAgainst:Number,
   goalDifference:Number,
   score:Number,
});

module.exports = mongoose.model('report', reportSchema);
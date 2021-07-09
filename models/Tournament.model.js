
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tournamentSchema = Schema({
    name: String,
    typetournamen: String,
    awards: String,
    grupo: [{type: Schema.ObjectId, ref: 'grupo'}]
});

module.exports = mongoose.model('torneo', tournamentSchema);
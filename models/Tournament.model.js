
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tournamentSchema = Schema({
    name: String,
    typetournamen: String,
    awards: String,
    liga: [{type: Schema.ObjectId, ref: 'liga'}]
});

module.exports = mongoose.model('torneo', tournamentSchema);
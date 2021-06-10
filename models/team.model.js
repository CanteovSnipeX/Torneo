
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
    name: String,
    nuIntegrantes: String,
    image: String,
});

module.exports = mongoose.model('equipo', teamSchema);
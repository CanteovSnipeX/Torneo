
'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
    name: String,
    nuIntegrantes: Number,
    image:String,
});

module.exports = mongoose.model('team', teamSchema);
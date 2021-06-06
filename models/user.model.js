
'use strick'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    image: String,
    role: String,
    torneo: [{type: Schema.ObjectId, ref: 'torneo'}]
});

module.exports = mongoose.model('user', userSchema);

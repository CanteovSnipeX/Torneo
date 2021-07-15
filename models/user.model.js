
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: {
          type: String,
          required: [true, "El usuario necesita un username"],
        },
        password: {
          type: String,
          required: [true, "El usuario necesita una contraseña"],
        },
        name: {
          type: String,
          required: [true, "El usuario necesita un nombre"],
        },
        lastname: {
          type: String,
          required: [true, "El usuario necesita unos apellidos"],
        },
        email: {
            type: String,
            required: [true, "El usuario necesita un rol"],
          },
        role: {
          type: String,
          required: [true, "El usuario necesita un rol"],
        },
        image: {
          type: String,
        },
    torneo: [{type: mongoose.ObjectId, ref: 'torneo'}]
});

module.exports = mongoose.model('user', userSchema);

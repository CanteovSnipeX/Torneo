'use strict'

var express = require('express');
var ligaController = require('../controllers/liga.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();



api.get('/pruebaLiga',ligaController.pruebaLiga);
api.post('/createLiga/:id',ligaController.createLiga);

module.exports = api;

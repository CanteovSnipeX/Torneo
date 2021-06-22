'use stirct'

var express = require('express');
var result = require('../controllers/result.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/crearResult',result.crearResult);
api.get('/getResult', result.getResult);


module.exports = api;
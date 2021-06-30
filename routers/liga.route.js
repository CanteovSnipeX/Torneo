'use strict'

var express = require('express');
var ligaController = require('../controllers/liga.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/pruebaLiga',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],ligaController.pruebaLiga);
api.post('/createLiga/:id',mdAuth.ensureAuth,ligaController.createLiga);
api.put('/:idT/updateLiga/:idL',mdAuth.ensureAuth,ligaController.updateLiga);
api.put('/:idT/removeLiga/:idL',mdAuth.ensureAuth,ligaController.removeLiga);
api.get('/getLIga',mdAuth.ensureAuth,ligaController.getLIga);

module.exports = api;

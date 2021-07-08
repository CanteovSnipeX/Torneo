'use strict'

var express = require('express');
var groupController = require('../controllers/group.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/pruebaLiga',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],groupController.pruebaLiga);
api.post('/createLiga/:id',mdAuth.ensureAuth,groupController.createLiga);
api.put('/:idT/updateLiga/:idL',mdAuth.ensureAuth,groupController.updateLiga);
api.put('/:idT/removeLiga/:idL',mdAuth.ensureAuth,groupController.removeLiga);
api.get('/getLigas',mdAuth.ensureAuth,groupController.getLigas);

module.exports = api;

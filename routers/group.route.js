'use strict'

var express = require('express');
var groupController = require('../controllers/group.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/pruebaLiga',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],groupController.pruebaLiga);
api.post('/createGrupo/:id',mdAuth.ensureAuth,groupController.createGrupo);
api.put('/:idT/updateGrupo/:idG',mdAuth.ensureAuth,groupController.updateGrupo);
api.put('/:idT/removeGrupo/:id',mdAuth.ensureAuth,groupController.removeGrupo);
api.get('/getGrupo',mdAuth.ensureAuth,groupController.getGrupo);

module.exports = api;

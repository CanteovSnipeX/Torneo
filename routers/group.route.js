'use strict'

var express = require('express');
var groupController = require('../controllers/group.controller');
var  mdAuth = require('../middlewares/authenticated');

var api = express.Router();


api.get('/pruebaGroup',groupController.pruebaGroup);
api.post('/creategrupo/:id', groupController.creategrupo);
api.put('/:idL/updateGrupo/:idG',groupController.updateGrupo);
api.put('/:idL/removeGrupo/:idG',groupController.removeGrupo);

module.exports = api;
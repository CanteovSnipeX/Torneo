'use strict'

var express = require('express');
var groupController = require('../controllers/group.controller');
var  mdAuth = require('../middlewares/authenticated');
var connectMultiparty = require('connect-multiparty');
var upload = connectMultiparty({ uploadDir: './uploads/equipos'})

var api = express.Router();


api.get('/pruebaGroup',groupController.pruebaGroup);
api.post('/creategrupo/:id', groupController.creategrupo);
api.put('/:idL/updateGrupo/:idG',groupController.updateGrupo);
api.put('/:idL/removeGrupo/:idG',groupController.removeGrupo);
api.get('/getGroup',groupController.getGroup);
api.put('/:idL/uploadImage/:idG', [upload],groupController.uploadImage); 
api.get('/getImageEquipos/:fileName', [upload],groupController.getImage);
module.exports = api;
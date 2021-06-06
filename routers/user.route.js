'use stirck'

var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuth = require('../middlewares/authenticated');


var api = express.Router();

api.get('/pruebaUser',userController.pruebaUser);
api.post('/login',userController.login);
api.post('/saveUser', userController.saveUser);
api.post('/saveUserByAdmin',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],userController.saveUserByAdmin);
api.put('/updateUser/:id',mdAuth.ensureAuth,userController.updateUser);
api.delete('/removeUser/:id',mdAuth.ensureAuth,userController.removeUser);
api.get('/getUsers',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],userController.getUsers);
api.post('/search',[mdAuth.ensureAuth,mdAuth.ensureAuthAdmin],userController.search); 


module.exports = api;

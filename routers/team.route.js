'use strict'

var express = require('express');
var teamController = require('../controllers/team.controller');
var  mdAuth = require('../middlewares/authenticated');
var connectMultiparty = require('connect-multiparty');
var upload = connectMultiparty({ uploadDir: './uploads/equipos'})

var api = express.Router();

//rutas de Equipos
api.get('/pruebaGroup',teamController.pruebaGroup);
api.post('/setTeam/:id',mdAuth.ensureAuth, teamController.setTeam);
api.put('/:idG/updateTeam/:idt',mdAuth.ensureAuth,teamController.updateTeam);
api.put('/:idG/removeTeam/:idt',mdAuth.ensureAuth,teamController.removeTeam);
api.get('/getTeams',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],teamController.getTeams);
api.put('/:idG/uploadImageTeam/:idt', [upload],teamController.uploadImageTeam); 
api.get('/getImageTeam/:fileName', [upload],teamController.getImageTeam);

//rutas  de partidios
api.post('/createPartido/:id',mdAuth.ensureAuth,teamController.createPartido);
api.put(':idG/finalizacionPartido/:idP',mdAuth.ensureAuth,teamController.finalizacionPartido);
api.get('/getPartidos',teamController.getPartidos)

module.exports = api;
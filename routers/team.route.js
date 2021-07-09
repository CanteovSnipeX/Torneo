'use strict'

var express = require('express');
var teamController = require('../controllers/team.controller');
var  mdAuth = require('../middlewares/authenticated');
var connectMultiparty = require('connect-multiparty');
var upload = connectMultiparty({ uploadDir: './uploads/equipos'})

var api = express.Router();


api.get('/pruebaGroup',teamController.pruebaGroup);
api.post('/setTeam/:id', teamController.setTeam);
api.put('/:idG/updateTeam/:idt',teamController.updateTeam);
api.put('/:idG/removeTeam/:idt',teamController.removeTeam);
api.get('/getTeams',teamController.getTeams);
api.put('/:idG/uploadImageTeam/:idt', [upload],teamController.uploadImageTeam); 
api.get('/getImageTeam/:fileName', [upload],teamController.getImageTeam);

//rutas  de partidios

api.post('/createPatido/:id',teamController.createPatido);


module.exports = api;
'use strict'

var express = require('express');
var teamController = require('../controllers/team.controller');
var  mdAuth = require('../middlewares/authenticated');
var connectMultiparty = require('connect-multiparty');
var upload = connectMultiparty({ uploadDir: './uploads/equipos'})

var api = express.Router();


api.get('/pruebaGroup',teamController.pruebaGroup);
api.post('/creategrupo/:id', teamController.creategrupo);
api.put('/:idL/updateGrupo/:idG',teamController.updateGrupo);
api.put('/:idL/removeGrupo/:idG',teamController.removeGrupo);
api.get('/getGroup',teamController.getGroup);
api.put('/:idL/uploadImage/:idG', [upload],teamController.uploadImage); 
api.get('/getImageEquipos/:fileName', [upload],teamController.getImage);

//rutas  de partidios

api.post('/createPatido/:id',teamController.createPatido);


module.exports = api;
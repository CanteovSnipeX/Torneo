'use strict'

var express = require('express');
var teamController = require('../controllers/team.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/pruebaTeam',teamController.pruebaTeam);
api.post('/setTeam/:id',teamController.setTeam);

module.exports = api;
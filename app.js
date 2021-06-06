'use strict'

var express = require("express");
var bodyParser = require("body-parser");
var tournamentRouter = require('./routers/tournament.route');
var userRouter = require('./routers/user.route');
var ligaRouter = require('./routers/liga.route');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1',userRouter);
app.use('/v1',tournamentRouter);
app.use('/v1',ligaRouter);


module.exports = app;

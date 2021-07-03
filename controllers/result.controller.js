'use strict'

var Goles = require('../models/goles.model')
var Result  = require('../models/results.model');


function crearResult (req ,res) {
    var result = new Result();
    var params = req.body;
     
    if(params.jornada && params.Equipo1 && params.Equipo2){
        Result.findOne({}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else if(userFind){
                return res.send({message: 'continuemos'});
            }else{
            result.jornada = params.jornada;
            result.Equipo1 = params.Equipo1;
            result.Equipo2 = params.Equipo2;
            result.save((err , resultSaved)=>{
                if(err){
                    return res.status(500).send({message:'Error'});
                }else if(resultSaved){
                        return res.send({message:'resultado guardados', resultSaved});
                }else{
                    return res.status(500).send({message: 'No se guardaron los resultados'});
                }
             })
            }
        })
        
     }else{
        return res.send({message: 'Por favor ingresa los datos obligatorios'});
     }
}

function getResult(req , res) {
    Result.find({}).populate('results').exec((err, result)=>{
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(result){
                return res.send({message: 'Resultados: ', result})
        }else{
                return res.status(404).send({message: 'No hay registros'})
        }
    })
}

function addPuntos(req, res) {
    var resultId = req.params.id;
    var goles = new Goles ();
    var params = req.body;

    if(params.resultEquipo &&  params.resultEquipo1){
        Goles.findOne({},(err)=>{
            if(err){
                return res.status(500).send({message:'Error'});
            }else{
                Result.findById(resultId,(err, golesFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general'});
                    }else if(golesFind){
                        goles.resultEquipo = params.resultEquipo;
                        goles.resultEquipo1 = params.resultEquipo1;
                        goles.save((err,saved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'});
                            }else if(saved){
                                Result.findByIdAndUpdate
                            }else{
                            }
                        })
                    }else{
                    }
                })

            }
        })
    }else{
    }
}




module.exports = {
    crearResult,
    getResult
}
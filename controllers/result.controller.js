'use strict'
var Team = require('../models/team.model');
var Result  = require('../models/results.model');


function crearResult (req ,res) {
    var teamId = req.params.id;
    var params = req.body;
    var result = new Result();

                Team.findById(teamId,(err, Find)=>{
                    if(err){
                     return res.status(500).send({message: 'Error general en el servidor'});
                    }else if(Find){
                     result.onegoles = params.onegoles;
                     result.twogoles = params.twogoles;
                     result.save((err, Saved)=>{
                         if(err){
                             return res.status(500).send({message: 'Error general al guardar'}); 
                         }else if(Saved){
                             Team.findByIdAndUpdate(teamId,{$push:{result: Saved._id}}, {new:true}, (err, Push)=>{
                                 if(err){
                                     return res.status(500).send({message: 'Error general'});
                                 }else if(Saved){
                                     return res.send({message: 'Seteados Correctamente', Push});
                                 }else{
                                     return res.status(500).send({message: 'Error al setear los resultados'});
                                 }
                             } ).populate('result');
                         }else{
                             return res.status(404).send({message: 'No se agregaron los resultados'})
                         }
                     })
                 }else{
                     return res.status(404).send({message: 'Team  no existe!'})
                    }
                })
}


function getResult(req , res) {
    Result.find({}).populate('result').exec((err, result)=>{
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(result){
                return res.send({message: 'Resultados: ', result})
        }else{
                return res.status(404).send({message: 'No hay registros'})
        }
    })
}




module.exports = {
    crearResult,
    getResult,
    
}
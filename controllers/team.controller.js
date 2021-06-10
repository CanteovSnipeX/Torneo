'use strict'

var Team = require('../models/team.model');
var Group = require('../models/group.model');


function pruebaTeam(req, res) {
    return res.send({message:'Funcionado desde el controlador de Equipo'});
}

function setTeam(req, res) {
    var grupoId = req.params.id;
    var team = new Team();
    var params = req.body;

        Group.findById(grupoId, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general'})
            }else if(userFind){
                team.name = params.name;
                team.nuIntegrantes = params.nuIntegrantes;
                team.save((err, contactSaved)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al guardar'})
                    }else if(contactSaved){
                        Group.findByIdAndUpdate(grupoId, {$push:{ contacts: contactSaved._id }}, {new: true}, (err, contactPush)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al agergar contacto'})
                            }else if(contactPush){
                                return res.send({message: 'Contacto agregado', contactPush });
                            }else{
                                return res.status(500).send({message: 'Error al agregar contacto'})
                            }
                        })
                    }else{
                        return res.status(404).send({message: 'No se guardó el contacto'})
                    }
                })
            }else{
                return res.status(404).send({message: 'El usuario al que deseas agregar el contacto no existe.'})
            } 
      })
}




module.exports = {
    pruebaTeam,
    setTeam
}
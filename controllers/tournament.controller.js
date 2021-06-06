'use strict'

var Torneo = require('../models/Tournament.model');
var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');

function pruebaTorneo(req, res) {
    return res.send({message:'Funcionando Controlador de Torneo :)'});
}

function createTorneo(req, res) {
    var  userId = req.params.id;
    var torneo = new Torneo();
    var params = req.body;


    if(params.name && params.typetournamen && params.awards ){
        Torneo.findOne({name: params.name},(err,torneoFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else if(torneoFind){
                return res.send({message: 'Nombre de usuario ya en uso'});
            }else{
                User.findById(userId, (err, userFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(userFind){
                        torneo.name = params.name;
                        torneo.typetournamen = params.typetournamen;
                        torneo.awards = params.awards;
                        torneo.save((err, torneoSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(torneoSaved){
                                User.findByIdAndUpdate(userId, {$push:{torneo: torneoSaved._id}}, {new: true}, (err, torneoPush)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general '})
                                    }else if(torneoPush){
                                        return res.send({message: 'Torneo Creada Exitosamente', torneoPush});
                                    }else{
                                        return res.status(500).send({message: 'Error al crearun torneo'})
                                    }
                                }).populate('liga')
                            }else{
                                return res.status(404).send({message: 'No se creo el torneo'})
                            }
                        })
                    }else{
                        return res.status(404).send({message: 'El usuario al que deseas agregar el contacto no existe.'})
                     }
                 })   
            }
        })
    }else{
        return res.send({message: 'Por favor ingresa los datos obligatorios'});
    }

}

function updateTorneo(req, res) {
    let userId = req.params.idU;
    let torneoId = req.params.idT;
    let update = req.body;

    if(update.name && update.typetournamen && update.awards){
        Torneo.findById(torneoId, (err, ligaFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general al buscar'});
            }else if(ligaFind){
                User.findOne({_id: userId, torneo: torneoId}, (err, userFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general en la busqueda de usuario'});
                    }else if(userFind){
                        Torneo.findByIdAndUpdate(torneoId, update, {new: true}, (err, ligaUpdated)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general en la actualización'});
                            }else if(ligaUpdated){
                                return res.send({message: 'Contacto actualizado', ligaUpdated});
                            }else{
                                return res.status(404).send({message: 'Contacto no actualizado'});
                            }
                        }).populate('liga')
                    }else{
                        return res.status(404).send({message: 'Usuario no encontrado'})
                    }
                })
            }else{
                return res.status(404).send({message: 'Contacto a actualizar inexistente'});
            }
        })
    }else{
        return res.status(404).send({message: 'Por favor ingresa los datos mínimos para actualizar'});
 }


}

function removeTorneo(req, res){
    let userId = req.params.idU;
    let torneoId = req.params.idT;
    let params = req.body;

    User.findOne({_id : userId}, (err, userFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general al eliminar'});
        }else if(userFind){
            bcrypt.compare(params.password,userFind.password, (err, checkPassword)=>{
                if(err){
                    return res.status(500).send({message: 'Error general al verificar contraseña'});
                }else if(checkPassword){
                    User.findOneAndUpdate({_id: userId, torneo: torneoId},
                        {$pull:{liga: torneoId}}, {new:true}, (err, contactPull)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general'});
                            }else if(contactPull){
                                Torneo.findByIdAndRemove(torneoId, (err, contactRemoved)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general al eliminar el torneo'});
                                    }else if(contactRemoved){
                                        return res.send({message: 'torneo eliminado', contactPull});
                                    }else{
                                        return res.status(500).send({message: 'Torneo no encontrado, o ya eliminado'});
                                    }
                                })
                            }else{
                                return res.status(500).send({message: 'No se pudo eliminar el Torneo '});
                            }
                })
                }else{
                    return res.status(401).send({message: 'Contraseña incorrecta, no puedes eliminar tu cuenta sin tu contraseña'});
                }
            })

        }else{
            return res.status(403).send({message: 'Torneo no eliminado'});
        }
    })

}

function getTorneo(req, res) {
    Torneo.find({}).populate('liga').exec((err, torneo)=>{
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(torneo){
                return res.send({message: 'Torneos Disponibles: ', torneo})
        }else{
                return res.status(404).send({message: 'No hay registros'})
        }
    })
}

module.exports = {
    pruebaTorneo,
    createTorneo,
    updateTorneo,
    removeTorneo,
    getTorneo
}
'use strict'

var Torneo = require('../models/Tournament.model');
var Liga = require('../models/liga.model');


function pruebaLiga(req, res) {
    return res.send({message:'Fundinado desde el controlador de liga'});
}

function createLiga(req, res) {
    var torneoId = req.params.id;
    var params = req.body;
    var liga = new Liga();

    if(params.name && params.Directors ){
        Liga.findOne({name: params.name},(err,ligaFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else if(ligaFind){
                return res.send({message: 'Nombre de usuario ya en uso'});
            }else{
                Torneo.findById(torneoId, (err, userFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(userFind){
                        liga.name = params.name;
                        liga.Directors = params.Directors;
                        liga.save((err, ligaSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(ligaSaved){
                                Torneo.findByIdAndUpdate(torneoId, {$push:{liga: ligaSaved._id}}, {new: true}, (err, ligaPush)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general '})
                                    }else if(ligaPush){
                                        return res.send({message: 'Liga Creada Exitosamente', ligaPush});
                                    }else{
                                        return res.status(500).send({message: 'Error al crear la liga'})
                                    }
                                }).populate('liga')
                            }else{
                                return res.status(404).send({message: 'No se creo la liga'})
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

function updateLiga(req, res) {
    let torneoId = req.params.idT;
    let ligaId = req.params.idL;
    let update = req.body;

        if(update.name && update.Directors){
            Liga.findById(ligaId, (err, ligaFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general al buscar'});
                }else if(ligaFind){
                    Torneo.findOne({_id: torneoId, liga: ligaId}, (err, userFind)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general en la busqueda de usuario'});
                        }else if(userFind){
                            Liga.findByIdAndUpdate(ligaId, update, {new: true}, (err, ligaUpdated)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general en la actualización'});
                                }else if(ligaUpdated){
                                    return res.send({message: 'Contacto actualizado', ligaUpdated});
                                }else{
                                    return res.status(404).send({message: 'Contacto no actualizado'});
                                }
                            })
                        }else{
                            return res.status(404).send({message: 'Torneo no Existente'})
                        }
                    })
                }else{
                    return res.status(404).send({message: 'Liga a actualizar inexistente'});
                }
            })
        }else{
            return res.status(404).send({message: 'Por favor ingresa los datos mínimos para actualizar'});
     }
}

function removeLiga(req, res) {
    let torneoId = req.params.idT;
    let ligaId = req.params.idL;
    
        Torneo.findOneAndUpdate({_id: torneoId, liga: ligaId},
            {$pull:{liga: ligaId}}, {new:true}, (err, contactPull)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'});
                }else if(contactPull){
                    Liga.findByIdAndRemove(ligaId, (err, contactRemoved)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al eliminar contacto'});
                        }else if(contactRemoved){
                            return res.send({message: 'Liga eliminado'});
                        }else{
                            return res.status(500).send({message: 'Liga no encontrado, o ya eliminado'});
                        }
                    })
                }else{
                    return res.status(500).send({message: 'No se pudo eliminarla liga del torneo'});
          }
    })
}

function getLIga(req, res) {
    Liga.find({}).populate('grupo').exec((err, ligas)=>{
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(ligas){
                return res.send({message: 'Ligas en Existencias:',ligas})
        }else{
            return res.status(403).send({message: 'No hay registros'})
        }
    })
}


module.exports = {
    pruebaLiga,
    createLiga,
    updateLiga,
    removeLiga,
    getLIga
}

'use strict'

var Torneo = require('../models/Tournament.model');
var Grupo = require('../models/group.model');


function pruebaLiga(req, res) {
    return res.send({message:'Fundinado desde el controlador de liga'});
}

function createGrupo(req, res) {
    var torneoId = req.params.id;
    var params = req.body;
    var grupo = new Grupo();

    if(params.Directors ){
        Grupo.findOne({name: params.Directors  },(err,ligaFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else if(ligaFind){
                return res.send({message: 'Nombre de usuario ya en uso'});
            }else{
                Torneo.findById(torneoId, (err, userFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(userFind){
                        grupo.name = params.name;
                        grupo.Directors = params.Directors;
                        grupo.save((err, GrupoSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(GrupoSaved){
                                Torneo.findByIdAndUpdate(torneoId, {$push:{grupo: GrupoSaved._id}}, {new: true}, (err, GrupoPush)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general '})
                                    }else if(GrupoPush){
                                        return res.send({message: 'Creada Exitosamente', GrupoPush});
                                    }else{
                                        return res.status(500).send({message: 'Error al crear el grupo'})
                                    }
                                }).populate('grupo');
                            }else{
                                return res.status(404).send({message: 'No se creo la grupo'})
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

function updateGrupo(req, res) {
    let torneoId = req.params.idT;
    let grupoId = req.params.idG;
    let update = req.body;

        if(update.name && update.Directors){
            Grupo.findById(grupoId, (err, GrupoFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general al buscar'});
                }else if(GrupoFind){
                    Torneo.findOne({_id: torneoId, grupo: grupoId}, (err, userFind)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general en la busqueda de usuario'});
                        }else if(userFind){
                            Grupo.findByIdAndUpdate(grupoId, update, {new: true}, (err, grupoUpdated)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general en la actualización'});
                                }else if(grupoUpdated){
                                    return res.send({message: 'Contacto actualizado', grupoUpdated});
                                }else{
                                    return res.status(404).send({message: 'no actualizado'});
                                }
                            }).populate('grupo');
                        }else{
                            return res.status(404).send({message: 'Torneo no Existente'})
                        }
                    })
                }else{
                    return res.status(404).send({message: 'grupo a actualizar inexistente'});
                }
            })
        }else{
            return res.status(404).send({message: 'Por favor ingresa los datos mínimos para actualizar'});
     }
}

function removeGrupo(req, res) {
    let torneoId = req.params.idT;
    let grupoId = req.params.idG;
    
        Torneo.findOneAndUpdate({_id: torneoId, grupo: grupoId},
            {$pull:{grupo: grupoId}}, {new:true}, (err, grupopull)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'});
                }else if(grupopull){
                    Grupo.findByIdAndRemove(grupoId, (err, remove)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al eliminar contacto'});
                        }else if(remove){
                            return res.send({message: 'Eliminado Existosamente', remove});
                        }else{
                            return res.status(500).send({message: 'grupo no encontrado, o ya eliminado'});
                        }
                    }).populate('grupo')
                }else{
                    return res.status(500).send({message: 'No se pudo eliminarla el grupo o ya fue aliminado '});
          }
    })
}

function getGrupo(req, res) {
    Grupo.find({}).populate('team').exec((err, grupos)=>{
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(grupos){
                return res.send({message: 'Ligas en Existencias:', grupos});
        }else{
            return res.status(403).send({message: 'No hay registros'})
        }
    })
}

module.exports = {
    pruebaLiga,
    createGrupo,
    updateGrupo,
    removeGrupo,
    getGrupo
}

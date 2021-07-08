'use strict'

var Group = require('../models/team.model');
var Liga = require('../models/group.model');
var fs = require('fs');
var path = require('path');



function pruebaGroup(req, res) {
    return res.send({message:'Funcionando desde el controlador de group'});
}


function uploadImage(req, res){
    var grupoId = req.params.idG;
    let ligaId = req.params.idL;
    var update = req.body;
    var fileName;

   
        if(req.files){

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[2];

            var extension = fileName.split('\.');
            var fileExt = extension[1];
            if( fileExt == 'png' ||
                fileExt == 'jpg' ||
                fileExt == 'jpeg' ||
                fileExt == 'gif'){

                    Liga.findOne({_id: ligaId, grupo: grupoId}, (err, ligaFind) => {
                        if(err){
                            return res.status(500).send({message: 'Error general en la actualización'});
                        }else if(ligaFind){
                            Group.findByIdAndUpdate(grupoId, {image:fileName},{new:true}, (err, grupoUpdate) => {
                                if(err){
                                    return res.status(500).send({message: 'Error general en la actualización'});
                                }else if(grupoUpdate){
                                    return res.send({message: 'Grupo actualizado', grupoUpdate});
                                }else{
                                    return res.status(404).send({message: 'Contacto no actualizado'});
                                }
                            }) 
                        }else{
                            return res.status(404).send({message: 'Liga no Existente'})
                        }
                    })
                }else{
                    fs.unlink(filePath, (err)=>{
                        if(err){
                            res.status(500).send({message: 'Extensión no válida y error al eliminar archivo'});
                        }else{
                            res.send({message: 'Extensión no válida'})
                        }
                    })
                }
        }else{
            res.status(400).send({message: 'No has enviado imagen a subir'})
        }
}


function getImage(req, res){
    var fileName = req.params.fileName;
    var pathFile = './uploads/equipos/' + fileName;

    fs.exists(pathFile, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message: 'Imagen inexistente'});
        }
    })
}

function creategrupo(req, res) {
    var ligaId = req.params.id;
    var grupo = new Group();
    var params = req.body;

    if(params.name){
        Group.findOne({name: params.name},(err, name) => {
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
                }else if(name){
                    return res.status(500).send({message: 'Nombre ya en uso!'});
            }else{
                Liga.findById(ligaId, (err, ligaFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(ligaFind){
                        grupo.name = params.name;
                        grupo.nintegrantes = params.nintegrantes;
                        grupo.save((err, grupoSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(grupoSaved){
                                Liga.findByIdAndUpdate(ligaId, {$push:{grupo: grupoSaved._id}}, {new: true}, (err, teamPush)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general'})
                                    }else if(teamPush){
                                        return res.send({message: 'Creada Exitosamente', teamPush});
                                    }else{
                                        return res.status(500).send({message: 'Error al crear el grupo'});
                                    }
                                }).populate('grupo');
                            }else{
                                return res.status(404).send({message: 'No se creo el grupo'})
                            }
                        })
                    }else{
                        return res.status(404).send({message: 'la liga al que deseas agregar el grupo no existe.'})
                     }
                 })   
            }
        })
    }else{
        return res.send({message: 'Por favor ingresa los datos obligatorios'});
    }

}

function updateGrupo(req, res) {
    let ligaId = req.params.idL;
    let grupoId = req.params.idG;
    let update = req.body;

    if(update.name){
        Group.findById(grupoId,(err, grupoFind) => {
            if(err){
                return res.status(500).send({message: 'Error general al buscar'});
            }else if(grupoFind){
                Liga.findOne({_id: ligaId, grupo: grupoId}, (err, ligaFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general en la actualización'});
                    }else if(ligaFind){
                        Group.findByIdAndUpdate(grupoId, update,{new:true}, (err, grupoUpdate) => {
                            if(err){
                                return res.status(500).send({message: 'Error general en la actualización'});
                            }else if(grupoUpdate){
                                return res.send({message: 'Grupo actualizado', grupoUpdate});
                            }else{
                                return res.status(404).send({message: 'Contacto no actualizado'});
                            }
                        }) 
                    }else{
                        return res.status(404).send({message: 'Liga no Existente'})
                    }
                })
            }else{
                return res.status(404).send({message: 'Grupo a actualizar inexistente'});
            }
        })

    }else{
        return res.status(404).send({message: 'Por favor ingresa los datos mínimos para actualizar'});
    }


}

function removeGrupo(req, res) {
    let ligaId = req.params.idL;
    let grupoId = req.params.idG;
    let params = req.body;
 
   if(params.remove){
    Group.findOne({name: params.remove}, (err, remove) => {
    if(err){
        return res.status(500).send({message: 'Error general'});
    }else if(remove){
        Liga.findOneAndUpdate({_id: ligaId, grupo: grupoId} , {$pull:{grupo: grupoId}}, {new:true}, (err, contactPull)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(contactPull){
                Group.findByIdAndRemove(grupoId, (err, contactRemoved)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al eliminar contacto'});
                    }else if(contactRemoved){
                        return res.send({message: 'Grupo eliminado'});
                    }else{
                        return res.status(500).send({message: 'Liga no encontrado, o ya eliminado'});
                    }
                })
            }else{
                return res.status(500).send({message: 'No se pudo eliminarla liga del torneo'});
      }
})
     }else{
        return res.status(403).send({message: 'El grupo ya fue eliminado o el nombre esta escrito de forma erronea'});
     }
    })
   }else{
    return res.status(403).send({message: 'Ingrese el Nombre del grupo para eliminar'});
   }


}

function getGroup(req, res) {
    Group.find({}).populate('').exec((err, groups) => {
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(groups){
                return res.send({message: 'Equipos: ', groups})
        }else{
                return res.status(404).send({message: 'No hay registros'})
        }
    })
}


var Partido = require('../models/partidos.model');

//Funciones de partidos 

function createPatido(req, res) {
    var ligaId = req.params.id;
    var partido = new Partido();
    var params = req.body;
    if( params.equipo1 &&  params.equipo2){
        Partido.findOne({equipo1: params.equipo1 , equipo2:params.equipo2},(err,partidosFind) => {
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else if(partidosFind){
                    return res.status(500).send({message:'Estos equipos ya estan dentro de un partido '});
                }else{
                Liga.findById(ligaId, (err, ligaFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(ligaFind){
                        partido.jornada = params.jornada;
                        partido.name = params.name;
                        partido.equipo1 = params.equipo1;
                        partido.equipo2 = params.equipo2;
                        partido.save((err, partidosSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(partidosSaved){
                                Liga.findByIdAndUpdate(ligaId, {$push:{partido: partidosSaved._id}}, {new: true}, (err, Push)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general'})
                                    }else if(Push){
                                        return res.send({message: 'Creado Exitosamente', Push});
                                    }else{
                                        return res.status(500).send({message: 'Error al crear el partido'});
                                    }
                                }).populate('partido');
                            }else{
                                return res.status(404).send({message: 'No se creo el partido'})
                            }
                        })
                    }else{
                        return res.status(404).send({message: 'El grupo al que desea agregar el partido ya no existe'})
                     }
                 })   
            }
        })
    }else{
        return res.send({message: 'Por favor ingresa los datos obligatorios'});
    }



}




module.exports = {
    pruebaGroup,
    uploadImage,
    getImage,
    creategrupo,
    updateGrupo,
    removeGrupo,
    getGroup,
    //partidos
    createPatido
    
}
'use strict'

var Team = require('../models/team.model');
var Grupo = require('../models/group.model');
var fs = require('fs');
var path = require('path');



function pruebaGroup(req, res) {
    return res.send({message:'Funcionando desde el controlador de group'});
}


function uploadImageTeam(req, res){
    var teamId = req.params.idt;
    let grupoId = req.params.idG;
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

                    Grupo.findOne({_id: grupoId, team: teamId}, (err, gupoFind) => {
                        if(err){
                            return res.status(500).send({message: 'Error general en la actualización'});
                        }else if(gupoFind){
                            Team.findByIdAndUpdate(teamId, {image:fileName},{new:true}, (err, teamUpdate) => {
                                if(err){
                                    return res.status(500).send({message: 'Error general en la actualización'});
                                }else if(teamUpdate){
                                    return res.send({message: 'Grupo actualizado', teamUpdate});
                                }else{
                                    return res.status(404).send({message: 'Contacto no actualizado'});
                                }
                            }) 
                        }else{
                            return res.status(404).send({message: 'grupo no Existente'})
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


function getImageTeam(req, res){
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

function setTeam(req, res) {
    var grupoId = req.params.id;
    var team = new Team();
    var params = req.body;

    if(params.name){
        Team.findOne({name: params.name},(err, name) => {
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
                }else if(name){
                    return res.status(500).send({message: 'Nombre ya en uso!'});
            }else{
                Grupo.findById(grupoId, (err, grupoFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(grupoFind){
                        team.name = params.name;
                        team.nintegrantes = params.nintegrantes;
                        team.save((err, teamSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(teamSaved){
                                Grupo.findByIdAndUpdate(grupoId, {$push:{team: teamSaved._id}}, {new: true}, (err, teamPush)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general'})
                                    }else if(teamPush){
                                        return res.send({message: 'Creada Exitosamente', teamPush});
                                    }else{
                                        return res.status(500).send({message: 'Error al crear el grupo'});
                                    }
                                }).populate('team');
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

function updateTeam(req, res) {
    let grupoId = req.params.idG;
    let teamId = req.params.idt;
    let update = req.body;

    if(update.name){
        Team.findById(teamId,(err, teamFind) => {
            if(err){
                return res.status(500).send({message: 'Error general al buscar'});
            }else if(teamFind){
                Grupo.findOne({_id: grupoId, team: teamId}, (err, grupoFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general en la actualización'});
                    }else if(grupoFind){
                        Team.findByIdAndUpdate(teamId, update,{new:true}, (err, teamUpdate) => {
                            if(err){
                                return res.status(500).send({message: 'Error general en la actualización'});
                            }else if(teamUpdate){
                                return res.send({message: 'Grupo actualizado', teamUpdate});
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

function removeTeam(req, res) {
    let grupoId = req.params.idG;
    let teamId = req.params.idt;
    let params = req.body;
 
   if(params.remove){
    Team.findOne({name: params.remove}, (err, remove) => {
    if(err){
        return res.status(500).send({message: 'Error general'});
    }else if(remove){
        Grupo.findOneAndUpdate({_id: grupoId, team: teamId} , {$pull:{team: teamId}}, {new:true}, (err, groupPull)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(groupPull){
                Team.findByIdAndRemove(teamId, (err, Removed)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al eliminar contacto'});
                    }else if(Removed){
                        return res.send({message: 'Grupo eliminado',Removed});
                    }else{
                        return res.status(500).send({message: 'Liga no encontrado, o ya eliminado'});
                    }
                })
            }else{
                return res.status(500).send({message: 'No se pudo eliminarla equipo del grupo'});
      }
})
     }else{
        return res.status(403).send({message: 'El grupo ya fue eliminado o el nombre esta escrito de forma erronea'});
     }
    })
   }else{
    return res.status(403).send({message: 'Ingrese el nombre del equipo para poder eliminar'});
   }


}

function getTeams(req, res) {
    Team.find({}).populate('team').exec((err, teams) => {
        if(err){
                return res.status(500).send({message: 'Error general en el servidor'})
        }else if(teams){
                return res.send({message: 'Equipos: ', teams})
        }else{
                return res.status(404).send({message: 'No hay registros'})
        }
    })
}


var Partido = require('../models/partidos.model');

//Funciones de partidos 

function createPartido(req, res) {
    var grupoId = req.params.id;
    var partido = new Partido();
    var params = req.body;

    if( params.name){
        Partido.findOne({name: params.name},(err,partidosFind) => {
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else if(partidosFind){
                    return res.status(500).send({message:'Estos equipos ya estan dentro de un partido '});
                }else{
                Grupo.findById(grupoId, (err, ligaFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(ligaFind){
                        partido.jornada = params.jornada;
                        partido.name = params.name;
                        partido.teamOne = params.teamOne;
                        partido.teamTwo = params.teamTwo;
                        partido.save((err, partidosSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(partidosSaved){
                                Grupo.findByIdAndUpdate(grupoId , {$push:{partido: partidosSaved._id}}, {new: true}, (err, Push)=>{
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

function finalizacionPartido(req, res) {
    
    var grupoId = req.params.idG
    var partidoId = req.params.idP
    let params = req.body;

    if(params.remove){
        Partido.findOne({name: params.remove}, (err, remove) => {
        if(err){
            return res.status(500).send({message: 'Error general'});
        }else if(remove){
            Grupo.findOneAndUpdate({_id: grupoId, partidos: partidoId} , {$pull:{partidos: partidoId}}, {new:true}, (err, groupPull)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'});
                }else if(groupPull){
                    Partido.findByIdAndRemove(partidoId, (err, Removed)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al eliminar contacto'});
                        }else if(Removed){
                            return res.send({message: 'Grupo eliminado',Removed});
                        }else{
                            return res.status(500).send({message: 'Liga no encontrado, o ya eliminado'});
                        }
                    })
                }else{
                    return res.status(500).send({message: 'No se pudo eliminarla equipo del grupo'});
          }
    })
         }else{
            return res.status(403).send({message: 'El grupo ya fue eliminado o el nombre esta escrito de forma erronea'});
         }
        })
       }else{
        return res.status(403).send({message: 'Ingrese el nombre del equipo para poder eliminar'});
       }
    
    
}

function getPartidos(req, res){
    Partido.find({}).populate('result').exec((err, match) => {
            if(err){
                    return res.status(500).send({message: 'Error general en el servidor'})
            }else if(match){
                    return res.send({message: 'Usuarios: ', match})
            }else{
                    return res.status(404).send({message: 'No hay registros'})
            }
        })    

}



module.exports = {
    pruebaGroup,
    uploadImageTeam,
    getImageTeam,
    setTeam,
    updateTeam,
    removeTeam,
    getTeams,
    //partidos
    createPartido,
    finalizacionPartido ,
    getPartidos 
}
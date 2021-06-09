'use strict'

var Group = require('../models/group.model');
var Liga = require('../models/liga.model');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.model');
const { find } = require('../models/group.model');


function pruebaGroup(req, res) {
    return res.send({message:'Funcionando desde el controlador de group'});
}

function creategrupo(req, res) {
    var ligaId = req.params.id;
    var grupo = new Group();
    var params = req.body;

    if(params.name){
        Group.findOne({},(err) => {
            if(err){
                return res.status(500).send({message: 'Error general en el servidor'});
            }else{
                Liga.findById(ligaId, (err, ligaFind) => {
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(ligaFind){
                        grupo.name = params.name;
                        grupo.save((err, grupoSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar'})
                            }else if(grupoSaved){
                                Liga.findByIdAndUpdate(ligaId, {$push:{grupo: grupoSaved._id}}, {new: true}, (err, Push)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general'})
                                    }else if(Push){
                                        return res.send({message: 'Gropo Creada Exitosamente', Push});
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


module.exports = {
    pruebaGroup,
    creategrupo,
    updateGrupo,
    removeGrupo
    
}
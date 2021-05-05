const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')
const {getExtension} = require('./entregables.controller')
const {sendNotificacionesNuevoEntregable} = require('./notificaciones.controller')

async function subirArchivo(req,res){
  console.log(req.body)
  let archivo = req.files == null? null : req.files.rubrica;
  let cierre = req.query.cierre ? true: false
  
  if(cierre){
    try{
      const cierre = await sequelize.models.Cierre.create({
        nombre: req.body.nombre,
        descripcion: req.body.instrucciones,
        fecha_asignacion: (new Date()).toISOString(),
        fecha_limite: req.body.fecha,
        id_proyecto: req.body.id_proyecto
      })
      
      if(archivo){
        const extension = getExtension(archivo.name)
        const filename = `${cierre.get('id_entregable')}_rubrica_cierre${extension}`
        const path = `src/archivos/${filename}`
        
        await archivo.mv(path)
        await cierre.update({
          url_rubrica: filename
        })
      }

      res.status(201).send({ message : 'Cierre creado' })
      
    } catch(err){
      return handleError(req,res,err)
    }
  }
  else{
    try{
      const entregable = await sequelize.models.Entregable.create({
        nombre: req.body.nombre,
        descripcion: req.body.instrucciones,
        fecha_asignacion: (new Date()).toISOString(),
        fecha_limite: req.body.fecha,
        id_etapa: req.body.idEtapa
      })
      
      if(archivo){
        const extension = getExtension(archivo.name)
        const filename = `${entregable.get('id_entregable')}_rubrica${extension}`
        const path = `src/archivos/${filename}`
        
        await archivo.mv(path)
        await entregable.update({
          url_rubrica: filename
        })
      }
      
      await sendNotificacionesNuevoEntregable(entregable.get('id_entregable'))

      res.status(201).send({ message : 'Entregable creado' })
    } catch(err){
      handleError(req,res,err)
    }
  }
}

  module.exports={
    subirArchivo
  }


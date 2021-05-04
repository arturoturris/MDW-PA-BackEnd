const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')
const {getExtension} = require('./entregables.controller')
const {sendNotificacionesNuevoEntregable} = require('./notificaciones.controller')

async function subirArchivo(req,res){
  let archivo = req.files == null? null : req.files.rubrica;
    
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

  module.exports={
    subirArchivo
  }


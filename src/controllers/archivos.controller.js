const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')
function subirArchivo(req,res){
    let archivo = req.files == null? null : req.files.rubrica;
    if(archivo)
      archivo.mv(`src/archivos/${archivo.name}`,async err => {
          if(err) return res.status(500).send({ message : err })
          await
          sequelize.query(`
          INSERT INTO entregable
          (nombre,descripcion,url,fecha_asignacion,id_proyecto)
          VALUES
          ("${req.body.nombre}","${req.body.instrucciones}","src/archivos/${req.body.nombre}","${req.body.fecha}",${req.params.id_proyecto})`)
          .then(res.status(201).send({ message : 'Entregable creado' }))
          .catch(error => handleError(req,res,error))
      })
    else
      
      sequelize.query(`
      INSERT INTO entregable
      (nombre,descripcion,url,fecha_asignacion,id_proyecto)
      VALUES
      ("${req.body.nombre}","${req.body.instrucciones}","","${req.body.fecha}",${req.params.id_proyecto})`)
      .then(res.status(201).send({ message : 'Entregable creado' }))
      .catch(error => handleError(req,res,error))
      
  }

  module.exports={
    subirArchivo
  }


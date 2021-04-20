const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')

async function getAsignacines(req,res){
    console.log(req.params)
    const {id_proyecto} = req.params;
    await 
    sequelize.query(`
    SELECT proyecto.id_proyecto,proyecto.nombre_proyecto,proyecto.descripcion,proyecto.fecha_inicio,
    proyecto.fecha_fin,entregable.nombre,entregable.descripcion,entregable.fecha_asignacion 
    FROM entregable,proyecto 
    WHERE proyecto.id_proyecto=entregable.id_proyecto
    AND proyecto.id_proyecto=${id_proyecto}`)
    .then(([result,metadata]) => {
        if(!result.length)
            res.json([{id_proyecto:id_proyecto}])
        else
            res.json(result)})
    .catch(error => handleError(error))
}

module.exports={
    getAsignacines
}
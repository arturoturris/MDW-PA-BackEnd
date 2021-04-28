const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')

async function getAsignacines(req,res){
    const {id_proyecto} = req.params;
    
    await
    sequelize.query(`
    SELECT proyecto.nombre_proyecto,proyecto.descripcion,proyecto.fecha_inicio,
    proyecto.fecha_fin
    FROM proyecto
    WHERE proyecto.id_proyecto=${id_proyecto}`)
    .then(([result,metadata]) =>{
        const infoProyecto = result
        sequelize.query(`
            SELECT proyecto.id_proyecto,entregable.nombre,entregable.descripcion,entregable.fecha_asignacion 
            FROM entregable,proyecto,etapa
            WHERE proyecto.id_proyecto=etapa.id_proyecto AND etapa.id_etapa = entregable.id_etapa 
            AND proyecto.id_proyecto=${id_proyecto}`)
        .then(([result1,metadata]) => {
            if(!result1.length)
                res.json({result1:[{id_proyecto}],infoProyecto})
            else
                res.json({result1,infoProyecto})})
        .catch(error => handleError(error))
    })
    .catch(error => handleError(error))


}

module.exports={
    getAsignacines
}
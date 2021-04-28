const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')

async function getEtapas(req,res){
    const {id_proyecto} = req.params;
    await
    sequelize.query(`
    SELECT etapa.nombre,etapa.id_etapa 
    FROM etapa
    WHERE etapa.id_proyecto = ${id_proyecto}`)
    .then(([result,metadata]) =>{
        res.json(result)
    })
    .catch(error => handleError(error))
}

module.exports={
    getEtapas
}
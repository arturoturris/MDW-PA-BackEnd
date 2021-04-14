const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')

async function findDetalles(req,res){
    const {id_proyecto} = req.params;
    await 
    sequelize.query(`SELECT nombre_proyecto,fecha_inicio,fecha_fin,descripcion from proyecto WHERE id_proyecto=${id_proyecto}`)
    .then(([result,metadata]) => res.json(result))
    .catch(error => console.log(error))
}

module.exports = {
    findDetalles
}
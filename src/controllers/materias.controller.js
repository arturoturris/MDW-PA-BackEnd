const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')

async function findMaterias(req,res){
    const {id_usuario} = req.params;
    try{
        return await sequelize.models.Materia.findAll({
            attributes: [
                'nrc',
                'nombre',
                [sequelize.col('Periodo.nombre'),'periodo'],
            ],
            include: [
                ],
            where:{id_usuario}
        })
    }catch(err){
        return null
    }
}

function getMaterias(req,res) {
    sequelize.models.Materia.findAll()
    .then(materias => res.json(materias))
    .catch(err => errorController.handleError(req,res,err))
}

module.exports = {
    getMaterias,
    findMaterias
}
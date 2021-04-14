const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')

async function findMaterias(req,res){
    const {id_usuario} = req.params;
    await 
    sequelize.query(`SELECT materia.nrc, materia.nombre, periodo.nombre as Pnombre FROM periodo INNER JOIN materia ON periodo.id_periodo = materia.id_periodo INNER JOIN profesor ON profesor.matricula = materia.matricula INNER JOIN usuario ON profesor.id_persona = usuario.id_usuario INNER JOIN persona ON usuario.id_persona = persona.id_persona WHERE usuario.id_usuario=${id_usuario}`)
    .then(([result,metadata]) => res.json(result))
    .catch(error => console.log(error))
}
// async function findMaterias(req,res){
//     const {id_usuario} = req.params;
//     try{
//         return await sequelize.models.Materia.findAll({
//             attributes: [
//                 'nrc',
//                 'nombre',
//                 [sequelize.col('Periodo.nombre'),'periodo'],
//             ],
//             include: [{
//                 model:sequelize.models.Periodo,
//                 arguments:[],
//                 include:[{
                    
//                 }]
//             }],
//             where:{matricula:id_usuario}
//         })
//     }catch(err){
//         return null
//     }
// }

function getMaterias(req,res) {
    sequelize.models.Materia.findAll()
    .then(materias => res.json(materias))
    .catch(err => errorController.handleError(req,res,err))
}

module.exports = {
    getMaterias,
    findMaterias
}
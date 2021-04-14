const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')

async function findProyectos(req,res){
    const {NRC} = req.params;
    await 
    sequelize.query(`SELECT DISTINCT proyecto.id_proyecto,proyecto.nombre_proyecto, proyecto.descripcion FROM proyecto INNER JOIN materia ON materia.nrc = materia.nrc INNER JOIN profesor ON materia.matricula = profesor.matricula INNER JOIN usuario ON profesor.id_persona = usuario.id_usuario INNER JOIN persona ON usuario.id_persona = persona.id_persona WHERE proyecto.nrc=${NRC}`)
    .then(([result,metadata]) => res.json(result))
    .catch(error => console.log(error))
}

module.exports = {
    findProyectos
}
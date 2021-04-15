const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')

function getMaterias(req,res) {
    sequelize.models.Materia.findAll()
    .then(materias => res.json(materias))
    .catch(err => handleError(req,res,err))
}

async function existsMateria(req,res,next){
    await sequelize.models.Materia.findOne({
        where: {nrc: req.params.nrc}
    })
    .then(materia => {
        if(!materia) return res.sendStatus(404)

        next()
    })
    .catch(err => handleError(req,res,err))
}

function getAlumnosIncritos(req,res){
    sequelize.models.Materia.findOne({
        attributes: [
            'nrc',
            'nombre',
            'clave',
            'seccion',
            'profesor',
            [sequelize.col('Alumnos.matricula'),'Alumnos.matricula'],
            [sequelize.col('Alumnos.Persona.nombre'),'Alumnos.nombre'],
            [sequelize.col('Alumnos.Persona.paterno'),'Alumnos.paterno'],
            [sequelize.col('Alumnos.Persona.materno'),'Alumnos.materno'],
        ],
        include: [
            {
                model: sequelize.models.Alumno,
                through: {
                    attributes: []
                },
                include: [
                    {
                        model: sequelize.models.Persona,
                        attributes: []
                    }
                ]
            }
        ],
        where: {nrc: req.params.nrc}
    })
    .then(lista => res.json(lista))
    .catch(err => handleError(req,res,err))
}

async function findProyectos(req,res){
    const {nrc} = req.params;
    await 
    sequelize.query(`SELECT DISTINCT proyecto.id_proyecto,proyecto.nombre_proyecto, proyecto.descripcion FROM proyecto INNER JOIN materia ON materia.nrc = materia.nrc INNER JOIN profesor ON materia.profesor = profesor.matricula INNER JOIN usuario ON profesor.id_persona = usuario.id_usuario INNER JOIN persona ON usuario.id_persona = persona.id_persona WHERE proyecto.nrc=${nrc}`)
    .then(([result,metadata]) => res.json(result))
    .catch(error => handleError(error))
}

module.exports = {
    getMaterias,
    getAlumnosIncritos,
    existsMateria,
    findProyectos
}
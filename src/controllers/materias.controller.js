const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')

async function findMaterias(req,res){
    const {matricula} = req.params;

    sequelize.models.Alumno.findOne({
        include:{
            model: sequelize.models.Materia,
            through: {
                attributes: []
            }
        },
        where: {matricula}
    })
    .then(materias => {res.json(materias)})
    .catch(err => errorController.handleError(req,res,err))
}

function getMaterias(req,res) {
    sequelize.models.Materia.findAll()
    .then(materias => res.json(materias))
    .catch(err => errorController.handleError(req,res,err))
}

function getMateriasAlumno(req,res){
    sequelize.models.Materia.findAll({
        where: {}
    })
    .then(materias => res.json(materias))
    .catch(err => errorController.handleError(req,res,err))
}

async function existsMateria(req,res,next){
    await sequelize.models.Materia.findOne({
        where: {nrc: req.params.nrc}
    })
    .then(materia => {
        if(!materia) return res.sendStatus(404)

        next()
    })
    .catch(err => errorController.handleError(req,res,err))
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
    .catch(err => errorController.handleError(req,res,err))
}

module.exports = {
    getMaterias,
    findMaterias,
    getAlumnosIncritos,
    existsMateria
}
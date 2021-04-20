const {sequelize} = require('../config/sequelize')
const errorController = require('./error.controller')
const ModelValidator = require('../validator/ModelValidator')

function existsAlumno(req,res,next){
    sequelize.models.Alumno.findOne({where: {matricula: req.params.matricula}})
        .then(alumno => {
            if(alumno)
                next()
            else
                res.sendStatus(404)
        })
        .catch(err =>
            errorController.handleError(req,res,err))   
}

function buildProyecto(body){
    return sequelize.models.Proyecto.build({
        nombre_proyecto: body.nombre_proyecto,
        fecha_inicio: body.fecha_inicio,
        fecha_limite: body.fecha_limite || null,
        fecha_fin: body.fecha_fin || null,
        descripcion: body.descripcion,
        nrc: body.nrc,
        coordinador: body.coordinador
    })
}

function buildEquipo(body,id_proyecto){
    const equipo = body.equipo || []
    const coordinador = body.coordinador
    let modelos = []

    if(!equipo.includes(coordinador))
        equipo.push(coordinador)

    for(let matricula of equipo){
        modelos.push(sequelize.models.Equipo.build({
            id_proyecto,
            matricula
        }))
    }

    return modelos
}

async function createProyecto(req,res){
    let proyecto = buildProyecto(req.body)
    let equipo

    try{    
        await sequelize.transaction(async t => {
            proyecto = await proyecto.save({transaction: t,validate: false})
            
            equipo = buildEquipo(req.body,proyecto.get('id_proyecto'))
            
            for(let integrante of equipo){
                await integrante.save({transaction: t,validate: false})
            }
        })

        return res.sendStatus(201)
    }
    catch(err){
        errorController.handleError(req,res,err)
    }
}

function validateProyecto(requestType){
    return async (req,res,next) => {
        let proyecto = buildProyecto(req.body)

        let validator = new ModelValidator()

        try{
            await validator.validate(proyecto,{skip: ['id_proyecto']})

            if(requestType === 'post'){

            }
        }
        catch(err){
            return errorController.handleError(req,res,err)
        }
        
        let validationErrors = validator.getErrors()

        if(validationErrors)
            return res.status(422).json({errors: validationErrors})

        next()
    }
}

function getProyectosAlumno(req,res){
    sequelize.models.Alumno.findOne({
        attributes: [
        ],
        include: {all:true,nested:true},
        where: {matricula: req.params.matricula}
    })
    .then(async proyectos => {
        if(!proyectos)
            return []
        return await res.json(proyectos.Proyectos)
    })
    .catch(err => errorController.handleError(req,res,err))
}

async function findDetalles(req,res){
    const {id_proyecto} = req.params;
    await 
    sequelize.query(`SELECT id_proyecto,nombre_proyecto,fecha_inicio,fecha_fin,descripcion from proyecto WHERE id_proyecto=${id_proyecto}`)
    .then(([result,metadata]) => res.json(result))
    .catch(error => handleError(error))
}

module.exports = {
    validateProyecto,
    createProyecto,
    getProyectosAlumno,
    existsAlumno,
    findDetalles
}
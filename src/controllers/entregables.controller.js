const {sequelize} = require('../config/sequelize')
const {handleError} = require('./error.controller')
const ModelValidator = require('../validator/ModelValidator')

exports.getEntregablesProyecto = (req,res) => {
    const {id_proyecto,id_etapa} = req.params
    
    sequelize.models.Entregable.findAll({
        include: {
            model: sequelize.models.Etapa,
            attributes: [],
            include: {
                model: sequelize.models.Proyecto,
                attributes: [],
                where: {id_proyecto}
            },
            where: {id_etapa}
        }
    })
    .then(entregables => res.json(entregables))
    .catch(err => handleError(req,res,err))
}

exports.getEntregable = (req,res) => {
    const {id_entregable} = req.params

    sequelize.models.Entregable.findOne({
        include:{
            model: sequelize.models.Etapa,
            attributes: ['id_etapa','nombre'],
            include: {
                model: sequelize.models.Proyecto,
                attributes: ['id_proyecto','nombre_proyecto']
            }
        },
        where: {id_entregable}
    })
    .then(entregable => res.json(entregable))
    .catch(err => handleError(req,res,err))
}

exports.existsEntregable = (req,res,next) => {
    const {id_entregable} = req.params

    sequelize.models.Entregable.findOne({
        attributes: ['id_entregable'],
        include:{
            model: sequelize.models.Etapa,
        },
        where: {id_entregable}
    })
    .then(entregable =>
        entregable ? next() : res.sendStatus(404)
    )
    .catch(err => handleError(req,res,err))
}

exports.descargarRubrica = (req,res) => {
    const {id_entregable} = req.params
    const path_entregables = 'src/archivos'

    sequelize.models.Entregable.findOne({
        attributes: ['id_entregable','url_rubrica'],
        where: {id_entregable}
    })
    .then(entregable =>{
        const archivo = entregable.url_rubrica
        
        archivo ?
            res.download(`${path_entregables}/${archivo}`) :
            res.sendStatus(404)
    })
    .catch(err => handleError(req,res,err))
}

exports.descargarEntregable = (req,res) => {
    const {id_entregable} = req.params
    const path_entregables = 'src/archivos'

    sequelize.models.Entregable.findOne({
        attributes: ['id_entregable','url_entregable'],
        where: {id_entregable}
    })
    .then(entregable =>{
        const archivo = entregable.url_entregable
        
        archivo ?
            res.download(`${path_entregables}/${archivo}`) :
            res.sendStatus(404)
    })
    .catch(err => handleError(req,res,err))
}

exports.subirEntregable = async (req,res) => {
    const {id_entregable} = req.params
    const {entregable} = req.files
    const extension = getExtension(entregable.name)
    const filename = `${req.params.id_entregable}_entregable${extension}`
    const path = `src/archivos/${filename}`
    
    try{
        await entregable.mv(path)
        await actualizarEntregable(id_entregable,filename)
        res.sendStatus(200)
    }catch(err){
        handleError(req,res,err)
    }
}

exports.getExtension = (filename) => {
    const name = filename.split('.')

    return name.length < 1 ?
        '' :
        `.${name[name.length-1]}`
} 

async function actualizarEntregable(id_entregable,nombre_entregable){
    try{
        const entregable = await sequelize.models.Entregable.findByPk(id_entregable)
        await entregable.update({
            url_entregable: nombre_entregable,
            fecha_entrega: Date.now(),
            entregado: true
        })
    } catch(err){
        throw err
    }
}
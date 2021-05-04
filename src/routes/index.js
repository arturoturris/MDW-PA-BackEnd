const router = require('express').Router()
const cors = require('cors')
const {getObjectFromToken} = require('../controllers/login.controller')

//ROUTES
router.use('/test',cors(),(req,res) => {
    res.json(req.headers)
})
router.use('/alumnos',cors(),require('./alumnos'))
router.use('/profesores',cors(),require('./profesores'))
router.use('/carreras',require('./carreras'))
router.use('/materias',cors(),require('./materias'))
router.use('/proyectos',cors(),require('./proyectos'))
router.use('/archivos',cors(),require('./archivos'))
router.use('/asignacion',cors(),require('./asignacion'))
router.use('/entregables',cors(),require('./entregables'))
router.use('/usuarios',cors(),require('./usuarios'))
router.use('/',cors(),require('./login'))

module.exports = router

const router = require('express').Router()
const cors = require('cors')

//ROUTES
router.use('/alumnos',cors(),require('./alumnos'))
router.use('/profesores',cors(),require('./profesores'))
router.use('/carreras',require('./carreras'))
router.use('/',cors(),require('./login'))

module.exports = router

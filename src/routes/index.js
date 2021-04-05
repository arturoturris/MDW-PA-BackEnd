const router = require('express').Router()
const cors = require('cors')

//ROUTES
router.use('/alumnos',require('./alumnos'))

module.exports = router

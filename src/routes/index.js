const router = require('express').Router()
const cors = require('cors')

//ROUTES
router.use('/test',cors(),(req,res) => {
    res.json(req.headers)
})
router.use('/alumnos',cors(),require('./alumnos'))
router.use('/profesores',cors(),require('./profesores'))
router.use('/carreras',require('./carreras'))
//<<<<<<< Updated upstream
//=======
router.use('/materias',cors(),require('./materias'))
router.use('/proyectos',cors(),require('./proyectos'))
router.use('/detalles',cors(),require('./detalles'))
//>>>>>>> Stashed changes
router.use('/',cors(),require('./login'))

module.exports = router

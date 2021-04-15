const {Router} = require('express')
const router = Router()
const proyectosController = require('../controllers/proyectos.controller')

router.post('/',
    proyectosController.validateProyecto('post'),
    proyectosController.createProyecto)
router.get('/:id_proyecto',
    proyectosController.findDetalles)

module.exports = router

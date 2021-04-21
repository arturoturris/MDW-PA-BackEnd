const {Router} = require('express')
const router = Router()
const proyectosController = require('../controllers/proyectos.controller')

router.post('/',
    proyectosController.validateProyecto('post'),
    proyectosController.createProyecto)
router.put('/:id_proyecto',
    proyectosController.existsProyecto,
    proyectosController.validateProyecto('put'),
    proyectosController.updateProyecto)
router.get('/:id_proyecto',
    proyectosController.findDetalles)
router.delete('/:id_proyecto',
    proyectosController.existsProyecto,
    proyectosController.deleteProyecto)
router.get('/:id_proyecto/etapas',
    proyectosController.existsProyecto,
    proyectosController.getEtapasProyecto)
router.post('/:id_proyecto/etapas',
    proyectosController.existsProyecto,
    proyectosController.validateEtapa('post'),
    proyectosController.createEtapa)

module.exports = router

const {Router} = require('express')
const router = Router()
const asignacionController = require('../controllers/asignacion.controller')

router.get('/:id_proyecto',
    asignacionController.getAsignacines)

module.exports = router
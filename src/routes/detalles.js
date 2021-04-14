const {Router} = require('express')
const router = Router()
const materiasController = require('../controllers/detalles.controller')

router.get('/:id_proyecto',
    materiasController.findDetalles);

module.exports=router;
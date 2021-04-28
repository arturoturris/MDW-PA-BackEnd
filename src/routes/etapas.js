const {Router} = require('express')
const router = Router()
const etapasController = require('../controllers/etapas.controller')

router.get('/:id_proyecto',
    etapasController.getEtapas)

module.exports = router
const {Router} = require('express')
const router = Router()
const materiasController = require('../controllers/proyectos.controller')

router.get('/:NRC',
    materiasController.findProyectos);

module.exports=router;
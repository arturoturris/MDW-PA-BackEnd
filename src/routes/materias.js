const {Router} = require('express')
const router = Router()
const materiasController = require('../controllers/materias.controller')

router.get('/',
    materiasController.getMaterias)
router.get('/:id_usuario',
    materiasController.findMaterias);

module.exports=router;
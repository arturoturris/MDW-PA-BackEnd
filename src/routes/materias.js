const {Router} = require('express')
const router = Router()
const materiasController = require('../controllers/materias.controller')

router.get('/',
    materiasController.getMaterias)
router.get('/:matricula',
    materiasController.findMaterias);
router.get('/:nrc/lista',
    materiasController.existsMateria,
    materiasController.getAlumnosIncritos)

module.exports=router;
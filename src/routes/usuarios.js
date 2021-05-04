const {Router} = require('express')
const router = Router()
const notificacionesController = require('../controllers/notificaciones.controller')

router.route('/:id_usuario/notificaciones')
    .all(notificacionesController.existsUsuario)
    .get(notificacionesController.getNotificaciones)
router.route('/:id_usuario/notificaciones/:id_notificacion')
    .all(notificacionesController.existsUsuario,
        notificacionesController.existsNotificacion)
    .put(notificacionesController.updateNotificacion)
    .delete(notificacionesController.deleteNotificacion)

module.exports = router

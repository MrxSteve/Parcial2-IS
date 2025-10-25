const express = require('express');
const MascotaController = require('../controllers/mascotaControllerPostgreSQL');

const router = express.Router();
const mascotaController = new MascotaController();

// Rutas para mascotas
router.get('/', mascotaController.listarTodas);
router.get('/:id', mascotaController.obtenerPorId);
router.post('/', mascotaController.crear);
router.put('/:id', mascotaController.actualizar);
router.delete('/:id', mascotaController.eliminar);

module.exports = router;
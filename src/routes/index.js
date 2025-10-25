const express = require('express');
const infoRoutes = require('./infoRoutes');
const mascotaRoutes = require('./mascotaRoutes');

const router = express.Router();

// Rutas principales
router.use('/', infoRoutes);
router.use('/mascotas', mascotaRoutes);

module.exports = router;
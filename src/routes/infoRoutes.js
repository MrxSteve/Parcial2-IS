const express = require('express');
const InfoController = require('../controllers/infoController');

const router = express.Router();
const infoController = new InfoController();

// Solo endpoint de health informacion
router.get('/health', infoController.healthCheck);

module.exports = router;
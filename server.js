const express = require('express');
const config = require('./src/config/config');
const routes = require('./src/routes');
const { errorHandler, notFound } = require('./src/middleware');

const app = express();

// Middleware básicos
app.use(express.json());

// Rutas principales
app.use('/', routes);

// Middleware de manejo de errores
app.use('*', notFound);
app.use(errorHandler);

// Iniciar servidor
app.listen(config.port, '0.0.0.0', () => {
  console.log(`🐾 API de Mascotas ejecutándose en puerto ${config.port}`);
  console.log(`🌐 Accede a: http://localhost:${config.port}`);
  console.log(`❤️  Health check: http://localhost:${config.port}/health`);
  console.log(`📋 Mascotas: http://localhost:${config.port}/mascotas`);
});

module.exports = app;
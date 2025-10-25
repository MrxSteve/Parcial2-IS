const express = require('express');
const config = require('./src/config/config');
const routes = require('./src/routes');
const Database = require('./src/config/database');

const app = express();

// Middleware básicos
app.use(express.json());

// Rutas principales
app.use('/', routes);

// Función para iniciar el servidor con base de datos
async function startServer() {
  try {
    // Inicializar base de datos
    const db = Database.getInstance();
    await db.testConnection();
    await db.initialize();

    // Iniciar servidor
    app.listen(config.port, '0.0.0.0', () => {
      console.log(`API de Mascotas con PostgreSQL ejecutándose en puerto ${config.port}`);
      console.log(`Accede a: http://localhost:${config.port}`);
      console.log(`Health check: http://localhost:${config.port}/health`);
      console.log(`Mascotas: http://localhost:${config.port}/mascotas`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
}

// Iniciar aplicación
startServer();

module.exports = app;
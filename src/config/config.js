const config = {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',

    app: {
        name: 'API de Gestión de Mascotas',
        version: '1.0.0'
    },

    // Configuración para PostgreSQL (Parte 2)
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME || 'parcial_db',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || '12345'
    }
};

module.exports = config;
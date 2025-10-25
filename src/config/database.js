const { Pool } = require('pg');
const config = require('./config');

class Database {
    constructor() {
        this.pool = new Pool({
            host: config.database.host,
            port: config.database.port,
            database: config.database.name,
            user: config.database.user,
            password: config.database.password,
            // Configuraciones adicionales
            max: 20, // máximo número de conexiones en el pool
            idleTimeoutMillis: 30000, // tiempo límite para conexiones inactivas
            connectionTimeoutMillis: 2000, // tiempo límite para conexión
        });

        // Manejar eventos del pool
        this.pool.on('error', (err, client) => {
            console.error('Error inesperado en el cliente PostgreSQL:', err);
        });

        this.pool.on('connect', () => {
            console.log('📊 Nueva conexión establecida con PostgreSQL');
        });
    }

    // Método para ejecutar queries
    async query(text, params) {
        const start = Date.now();
        try {
            const res = await this.pool.query(text, params);
            const duration = Date.now() - start;

            if (config.environment === 'development') {
                console.log(`🔍 Query ejecutada: ${text} - Duración: ${duration}ms`);
            }

            return res;
        } catch (error) {
            console.error('❌ Error ejecutando query:', error);
            throw error;
        }
    }

    // Método para obtener un cliente del pool (para transacciones)
    async getClient() {
        const client = await this.pool.connect();
        return client;
    }

    // Método para cerrar todas las conexiones
    async close() {
        await this.pool.end();
        console.log('📊 Pool de conexiones PostgreSQL cerrado');
    }

    // Método para verificar conexión
    async testConnection() {
        try {
            const result = await this.query('SELECT NOW() as current_time');
            console.log('✅ Conexión a PostgreSQL exitosa:', result.rows[0].current_time);
            return true;
        } catch (error) {
            console.error('❌ Error conectando a PostgreSQL:', error.message);
            return false;
        }
    }

    // Método para inicializar la base de datos
    async initialize() {
        try {
            // Crear tabla mascotas si no existe
            await this.query(`
        CREATE TABLE IF NOT EXISTS mascotas (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          tipo VARCHAR(50) NOT NULL,
          encargado VARCHAR(100) NOT NULL,
          edad INTEGER NOT NULL CHECK (edad >= 0),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

            // Insertar datos de prueba si la tabla está vacía
            const countResult = await this.query('SELECT COUNT(*) FROM mascotas');
            const count = parseInt(countResult.rows[0].count);

            if (count === 0) {
                await this.query(`
          INSERT INTO mascotas (nombre, tipo, encargado, edad) VALUES
          ('Firulais', 'Perro', 'Juan Pérez', 3),
          ('Michi', 'Gato', 'Ana García', 2),
          ('Bobby', 'Perro', 'Carlos López', 5),
          ('Whiskers', 'Gato', 'María González', 1),
          ('Rex', 'Perro', 'Luis Martínez', 4);
        `);
                console.log('✅ Datos de prueba insertados en la tabla mascotas');
            }

            console.log('✅ Base de datos inicializada correctamente');
        } catch (error) {
            console.error('❌ Error inicializando base de datos:', error);
            throw error;
        }
    }
}

// Singleton para la conexión a la base de datos
let dbInstance = null;

module.exports = {
    getInstance: () => {
        if (!dbInstance) {
            dbInstance = new Database();
        }
        return dbInstance;
    }
};
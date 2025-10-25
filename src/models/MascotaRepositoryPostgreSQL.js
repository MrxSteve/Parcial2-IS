const Mascota = require('./Mascota');
const Database = require('../config/database');

class MascotaRepository {
    constructor() {
        this.db = Database.getInstance();
    }

    // Obtener todas las mascotas
    async obtenerTodas() {
        try {
            const result = await this.db.query('SELECT * FROM mascotas ORDER BY id');
            return result.rows.map(row => new Mascota(row.id, row.nombre, row.tipo, row.encargado, row.edad));
        } catch (error) {
            console.error('Error obteniendo todas las mascotas:', error);
            throw new Error('Error al obtener las mascotas');
        }
    }

    // Obtener mascota por ID
    async obtenerPorId(id) {
        try {
            const result = await this.db.query('SELECT * FROM mascotas WHERE id = $1', [parseInt(id)]);
            if (result.rows.length === 0) {
                return null;
            }
            const row = result.rows[0];
            return new Mascota(row.id, row.nombre, row.tipo, row.encargado, row.edad);
        } catch (error) {
            console.error('Error obteniendo mascota por ID:', error);
            throw new Error('Error al obtener la mascota');
        }
    }

    // Crear nueva mascota
    async crear(datosNuevaMascota) {
        try {
            // Validar datos usando el modelo Mascota
            const validacion = Mascota.validar(datosNuevaMascota);
            if (!validacion.esValido) {
                throw new Error(`Datos inválidos: ${validacion.errores.join(', ')}`);
            }

            const { nombre, tipo, encargado, edad } = datosNuevaMascota;
            const result = await this.db.query(
                'INSERT INTO mascotas (nombre, tipo, encargado, edad) VALUES ($1, $2, $3, $4) RETURNING *',
                [nombre.trim(), tipo.trim(), encargado.trim(), edad]
            );

            const row = result.rows[0];
            return new Mascota(row.id, row.nombre, row.tipo, row.encargado, row.edad);
        } catch (error) {
            console.error('Error creando mascota:', error);
            throw error;
        }
    }

    // Actualizar mascota existente
    async actualizar(id, datosActualizados) {
        try {
            // Validar datos usando el modelo Mascota
            const validacion = Mascota.validar(datosActualizados);
            if (!validacion.esValido) {
                throw new Error(`Datos inválidos: ${validacion.errores.join(', ')}`);
            }

            const { nombre, tipo, encargado, edad } = datosActualizados;
            const result = await this.db.query(
                'UPDATE mascotas SET nombre = $1, tipo = $2, encargado = $3, edad = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
                [nombre.trim(), tipo.trim(), encargado.trim(), edad, parseInt(id)]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];
            return new Mascota(row.id, row.nombre, row.tipo, row.encargado, row.edad);
        } catch (error) {
            console.error('Error actualizando mascota:', error);
            throw error;
        }
    }

    // Eliminar mascota
    async eliminar(id) {
        try {
            const result = await this.db.query('DELETE FROM mascotas WHERE id = $1 RETURNING *', [parseInt(id)]);

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];
            return new Mascota(row.id, row.nombre, row.tipo, row.encargado, row.edad);
        } catch (error) {
            console.error('Error eliminando mascota:', error);
            throw new Error('Error al eliminar la mascota');
        }
    }

    // Obtener estadísticas
    async obtenerEstadisticas() {
        try {
            const totalResult = await this.db.query('SELECT COUNT(*) as total FROM mascotas');
            const tiposResult = await this.db.query('SELECT tipo, COUNT(*) as cantidad FROM mascotas GROUP BY tipo');
            const edadResult = await this.db.query('SELECT AVG(edad) as promedio FROM mascotas');

            const total = parseInt(totalResult.rows[0].total);
            const tiposMasComunes = {};

            tiposResult.rows.forEach(row => {
                tiposMasComunes[row.tipo] = parseInt(row.cantidad);
            });

            const edadPromedio = total > 0 ? parseFloat(edadResult.rows[0].promedio).toFixed(2) : 0;

            return {
                total,
                tiposMasComunes,
                edadPromedio
            };
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            throw new Error('Error al obtener estadísticas');
        }
    }
}

// Singleton para mantener la misma instancia
let instancia = null;

module.exports = {
    getInstance: () => {
        if (!instancia) {
            instancia = new MascotaRepository();
        }
        return instancia;
    }
};
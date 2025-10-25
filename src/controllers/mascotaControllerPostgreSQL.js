const MascotaRepositoryPostgreSQL = require('../models/MascotaRepositoryPostgreSQL');

class MascotaController {
    constructor() {
        this.repository = MascotaRepositoryPostgreSQL.getInstance();
    }

    // GET /mascotas - Listar todas las mascotas
    listarTodas = async (req, res) => {
        try {
            const mascotas = await this.repository.obtenerTodas();
            const estadisticas = await this.repository.obtenerEstadisticas();

            res.json({
                success: true,
                count: mascotas.length,
                data: mascotas,
                estadisticas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las mascotas',
                error: error.message
            });
        }
    };

    // GET /mascotas/:id - Obtener mascota por ID
    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const mascota = await this.repository.obtenerPorId(id);

            if (!mascota) {
                return res.status(404).json({
                    success: false,
                    message: `Mascota con ID ${id} no encontrada`
                });
            }

            res.json({
                success: true,
                data: mascota
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la mascota',
                error: error.message
            });
        }
    };

    // POST /mascotas - Crear nueva mascota
    crear = async (req, res) => {
        try {
            const nuevaMascota = await this.repository.crear(req.body);

            res.status(201).json({
                success: true,
                message: 'Mascota creada exitosamente',
                data: nuevaMascota
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al crear la mascota',
                error: error.message
            });
        }
    };

    // PUT /mascotas/:id - Actualizar mascota
    actualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const mascotaActualizada = await this.repository.actualizar(id, req.body);

            if (!mascotaActualizada) {
                return res.status(404).json({
                    success: false,
                    message: `Mascota con ID ${id} no encontrada`
                });
            }

            res.json({
                success: true,
                message: 'Mascota actualizada exitosamente',
                data: mascotaActualizada
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al actualizar la mascota',
                error: error.message
            });
        }
    };

    // DELETE /mascotas/:id - Eliminar mascota
    eliminar = async (req, res) => {
        try {
            const { id } = req.params;
            const mascotaEliminada = await this.repository.eliminar(id);

            if (!mascotaEliminada) {
                return res.status(404).json({
                    success: false,
                    message: `Mascota con ID ${id} no encontrada`
                });
            }

            res.json({
                success: true,
                message: 'Mascota eliminada exitosamente',
                data: mascotaEliminada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la mascota',
                error: error.message
            });
        }
    };
}

module.exports = MascotaController;
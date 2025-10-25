const MascotaRepository = require('../models/MascotaRepository');

class MascotaController {
    constructor() {
        this.repository = MascotaRepository.getInstance();
    }

    listarTodas = (req, res) => {
        try {
            const mascotas = this.repository.obtenerTodas();
            const estadisticas = this.repository.obtenerEstadisticas();

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

    obtenerPorId = (req, res) => {
        try {
            const { id } = req.params;
            const mascota = this.repository.obtenerPorId(id);

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

    crear = (req, res) => {
        try {
            const nuevaMascota = this.repository.crear(req.body);

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

    actualizar = (req, res) => {
        try {
            const { id } = req.params;
            const mascotaActualizada = this.repository.actualizar(id, req.body);

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

    eliminar = (req, res) => {
        try {
            const { id } = req.params;
            const mascotaEliminada = this.repository.eliminar(id);

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
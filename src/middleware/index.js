// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
};

// Middleware para rutas no encontradas
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado'
    });
};

module.exports = {
    errorHandler,
    notFound
};
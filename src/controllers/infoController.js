class InfoController {
    healthCheck = (req, res) => {
        res.json({
            status: 'OK',
            estudiante: 'Geofrey Steve Muñoz Tobar ',
            carnet: '25840',
            curso: 'Implantación de Sistemas',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0'
        });
    };
}

module.exports = InfoController;
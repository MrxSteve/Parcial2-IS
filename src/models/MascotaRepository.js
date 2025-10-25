const Mascota = require('./Mascota');

class MascotaRepository {
    constructor() {
        // Base de datos temporal en memoria
        this.mascotas = [
            new Mascota(1, 'Firulais', 'Perro', 'Juan Pérez', 3),
            new Mascota(2, 'Michi', 'Gato', 'Ana García', 2),
            new Mascota(3, 'Bobby', 'Perro', 'Carlos López', 5),
            new Mascota(4, 'Whiskers', 'Gato', 'María González', 1)
        ];
        this.nextId = 5;
    }

    obtenerTodas() {
        return [...this.mascotas]; // Retorna una copia
    }

    obtenerPorId(id) {
        return this.mascotas.find(mascota => mascota.id === parseInt(id));
    }

    crear(datosNuevaMascota) {
        const nuevaMascota = Mascota.crear(datosNuevaMascota);
        nuevaMascota.id = this.nextId++;
        this.mascotas.push(nuevaMascota);
        return nuevaMascota;
    }

    actualizar(id, datosActualizados) {
        const indice = this.mascotas.findIndex(mascota => mascota.id === parseInt(id));
        if (indice === -1) {
            return null;
        }

        const mascotaActualizada = Mascota.crear(datosActualizados);
        mascotaActualizada.id = parseInt(id);
        this.mascotas[indice] = mascotaActualizada;
        return mascotaActualizada;
    }

    eliminar(id) {
        const indice = this.mascotas.findIndex(mascota => mascota.id === parseInt(id));
        if (indice === -1) {
            return null;
        }

        const mascotaEliminada = this.mascotas.splice(indice, 1)[0];
        return mascotaEliminada;
    }

    obtenerEstadisticas() {
        const total = this.mascotas.length;
        const tiposCont = {};
        let edadTotal = 0;

        this.mascotas.forEach(mascota => {
            tiposCont[mascota.tipo] = (tiposCont[mascota.tipo] || 0) + 1;
            edadTotal += mascota.edad;
        });

        return {
            total,
            tiposMasComunes: tiposCont,
            edadPromedio: total > 0 ? (edadTotal / total).toFixed(2) : 0
        };
    }
}

// Singleton para mantener la misma instancia en memoria
let instancia = null;

module.exports = {
    getInstance: () => {
        if (!instancia) {
            instancia = new MascotaRepository();
        }
        return instancia;
    }
};
class Mascota {
    constructor(id, nombre, tipo, encargado, edad) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.encargado = encargado;
        this.edad = edad;
    }

    static validar(data) {
        const { nombre, tipo, encargado, edad } = data;
        const errores = [];

        if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
            errores.push('El nombre es requerido y debe ser un texto válido');
        }

        if (!tipo || typeof tipo !== 'string' || tipo.trim().length === 0) {
            errores.push('El tipo es requerido y debe ser un texto válido');
        }

        if (!encargado || typeof encargado !== 'string' || encargado.trim().length === 0) {
            errores.push('El encargado es requerido y debe ser un texto válido');
        }

        if (edad === undefined || edad === null || typeof edad !== 'number' || edad < 0) {
            errores.push('La edad es requerida y debe ser un número positivo');
        }

        return {
            esValido: errores.length === 0,
            errores
        };
    }

    static crear(data) {
        const validacion = this.validar(data);
        if (!validacion.esValido) {
            throw new Error(`Datos inválidos: ${validacion.errores.join(', ')}`);
        }

        return new Mascota(
            null, // ID se asigna en repository
            data.nombre.trim(),
            data.tipo.trim(),
            data.encargado.trim(),
            data.edad
        );
    }

    // Convertir a objeto plano para JSON
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            tipo: this.tipo,
            encargado: this.encargado,
            edad: this.edad
        };
    }
}

module.exports = Mascota;
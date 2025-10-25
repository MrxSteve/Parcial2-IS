-- Crear tabla mascotas si no existe
CREATE TABLE IF NOT EXISTS mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    encargado VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL CHECK (edad >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO mascotas (nombre, tipo, encargado, edad) VALUES
('Firulais', 'Perro', 'Juan Pérez', 3),
('Michi', 'Gato', 'Ana García', 2),
('Bobby', 'Perro', 'Carlos López', 5),
('Whiskers', 'Gato', 'María González', 1),
('Rex', 'Perro', 'Luis Martínez', 4),
('Garfield', 'Gato', 'Pedro Sánchez', 6),
('Max', 'Perro', 'Laura Torres', 2),
('Nemo', 'Pez', 'Sofia Ruiz', 1)
ON CONFLICT DO NOTHING;

-- Consultar datos insertados
SELECT * FROM mascotas ORDER BY id;
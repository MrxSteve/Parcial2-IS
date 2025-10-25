# Usar imagen base oficial de Node.js 18 en Alpine Linux (más ligera)
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar cache de Docker)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --only=production && npm cache clean --force

# Copiar el código de la aplicación
COPY . .

# Crear usuario no-root para mayor seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Cambiar permisos del directorio de trabajo
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
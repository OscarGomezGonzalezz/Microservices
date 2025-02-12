# Etapa 1: Construcción (Builder)
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# Instalar las dependencias (solo las necesarias para la construcción)
RUN npm install
# Copiar el resto del código fuente
COPY . .

# Construir los archivos estáticos si fuera necesario (puedes agregar este paso si tu aplicación genera algo como una versión minimizada)
# RUN npm run build  # Descomenta si necesitas hacer una compilación de la app (como Vite o React)

# Etapa 2: Producción (Imagen Final)
FROM node:18-slim AS production
WORKDIR /app

# Copiar solo los archivos generados de la etapa de construcción
COPY --from=builder /app /app

# Instalar solo las dependencias de producción
RUN npm install --production

# Exponer el puerto en el que la app estará escuchando
EXPOSE 3000

#Esto invoca un script definido en el archivo package.json que puede incluir no solo el comando para ejecutar la aplicación (node server.js),
#sino también otros pasos o configuraciones adicionales que podrían ser necesarios
CMD ["npm", "start"]


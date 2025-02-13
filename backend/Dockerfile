# Etapa 1: Construcción (Builder)
FROM node:18-alpine AS builder

RUN apk update && apk add --no-cache perl
# Actualizar zlib en la imagen Alpine
RUN apk update && apk upgrade zlib

WORKDIR /app
COPY package.json package-lock.json ./
# Instalar las dependencias (solo las necesarias para la construcción)
RUN npm install
# Copiar el resto del código fuente
COPY . .
USER node

# Construir los archivos estáticos si fuera necesario (puedes agregar este paso si tu aplicación genera algo como una versión minimizada)
# RUN npm run build  # Descomenta si necesitas hacer una compilación de la app (como Vite o React)

# Etapa 2: Producción (Imagen Final(usamos la version ligera de node solo en la etapa production ya que en la etapa build 
# se necesitaran herramientas adicionales que son mas faciles de instalar en una imagen completa))
FROM node:18-slim AS production
WORKDIR /app

# Crear un usuario no root con ID 1000
RUN groupadd -g 1000 node || true && \
    id -u node &>/dev/null || useradd -m -u 1000 -g node node


# Copiar los archivos generados de la etapa de construcción con la propiedad correcta
COPY --from=builder /app /app

# Usar root para cambiar permisos
USER root
RUN chown -R node:node /app && chmod -R 755 /app
RUN apt-get update && apt-get install --only-upgrade perl-base
# Establecer el usuario para las siguientes instrucciones
USER node

# Instalar solo las dependencias de producción
RUN npm install --production

# Exponer el puerto en el que la app estará escuchando
EXPOSE 3000

#Esto invoca un script definido en el archivo package.json que puede incluir no solo el comando para ejecutar la aplicación (node server.js),
#sino también otros pasos o configuraciones adicionales que podrían ser necesarios
CMD ["npm", "start"]


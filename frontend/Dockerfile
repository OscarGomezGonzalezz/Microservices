# Etapa 1: Construcción de la app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: Servir con Nginx
#Esta imagen se encargará de servir los archivos estáticos generados en la primera etapa
FROM nginx:alpine
#Aquí es donde entra el concepto de multi-stage builds: La palabra clave --from=builder le dice a Docker que copie los archivos
#construidos desde la etapa builder y los coloque en el sitio predefinido donde nginx busca los archivos estaticos para servir
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

#Este comando ejecuta Nginx en primer plano (con daemon off;), lo que hace que el contenedor siga ejecutándose y sirviendo el sitio.
#Sin esto, el contenedor terminaría rápidamente porque el proceso de Nginx se ejecutaría en segundo plano.
CMD ["nginx", "-g", "daemon off;"]

#¿Cómo funciona el multi-stage building?
#Etapa de construcción: Docker construye la aplicación en el contenedor basado en Node.js. Esto incluye instalar dependencias y generar los archivos de producción.
#Etapa de servidor: Una vez que la construcción está lista, Docker crea un segundo contenedor basado en Nginx, y solo copia los archivos construidos (sin las dependencias de Node.js ni el código fuente) para servirlos.

#Esto hace que en lugar de llevar todo el entorno de construcción (Node.js, dependencias, etc.) al contenedor final, solo copiamos los archivos estáticos generados. Esto hace que la imagen final sea mucho más pequeña y eficiente.
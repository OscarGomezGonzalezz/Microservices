Creamos el frontend con Vite, un bundler moderno:

npm create vite@latest frontend -- --template react
cd frontend
npm install
Esto generará una estructura ligera optimizada para desarrollo y producción.

Ademas, añadimos un dockerignore y un nginx config file.

NGINX(en lugar de Apache http server) es una herramienta extremadamente poderosa y flexible, usada principalmente como servidor web, proxy inverso, balanceador de carga y proxy de aplicaciones. Se destaca por su alto rendimiento, capacidad de manejar un alto volumen de tráfico y su bajo consumo de recursos. Es una opción popular para aplicaciones web de alto tráfico y entornos de producción que requieren escalabilidad y alta disponibilidad.

PARA EL TESTEO DEL BACKEND, DE CADA CLUSTER TENEMOS QUE HACER UN PORT FORWARDING:
kubectl port-forward service/backend-service 3000:3000
Esto redirige el puerto 3000 de Kubernetes a tu localhost:3000, permitiéndote acceder a tu backend como si estuviera en tu máquina.
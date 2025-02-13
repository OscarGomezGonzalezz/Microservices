Creamos el frontend con Vite, un bundler moderno:

- npm create vite@latest frontend -- --template react
- cd frontend
- npm install

Esto generará una estructura ligera optimizada para desarrollo y producción.

Ademas, añadimos un dockerignore y un nginx config file.

NGINX(en lugar de Apache http server) es una herramienta extremadamente poderosa y flexible, usada principalmente como servidor web, proxy inverso, balanceador de carga y proxy de aplicaciones. Se destaca por su alto rendimiento, capacidad de manejar un alto volumen de tráfico y su bajo consumo de recursos. Es una opción popular para aplicaciones web de alto tráfico y entornos de producción que requieren escalabilidad y alta disponibilidad.

PARA EL TESTEO, VEMOS LOS PODS CON - kubectl get pods, y:

* Mongo: kubectl exec -it mongo-85658f75fb-rkq8j -- mongosh
* Backend con Mongo: kubectl port-forward service/backend-service 3000:3000 ==> (Esto redirige el puerto 3000 de Kubernetes a tu localhost:3000, permitiéndote acceder a tu backend como si estuviera en tu máquina.)
* Backend con frontend: kubectl exec -it frontend-6556dd4c8-dn2ds -- curl http://backend-service:3000/api/data


Una vez vemos que todos los contenedores se conectan entre si, escribimos este codigo para acceder al frontend:

- minikube service frontend-service --url

Uso de Trivy para deteccion de vulnerabilidades

Aplicar las etiquetas para PodSecurity (PSA)
Ejecuta estos comandos para agregar las etiquetas necesarias al namespace default:

- kubectl label namespace default pod-security.kubernetes.io/enforce=restricted
- kubectl label namespace default pod-security.kubernetes.io/enforce-version=v1.25

####HTTPS SETUP####:

- helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

# Actualizar repositorio
- helm repo update

# Instalar el Ingress Controller en el namespace "ingress-nginx"
- helm install nginx-ingress ingress-nginx/ingress-nginx \
  --set controller.publishService.enabled=true

# Para habilitar HTTPS, necesitamos un certificado SSL. Usaremos cert-manager para gestionar los certificados automáticamente.
- kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

Crear el Issuer de Let's Encrypt; - kubectl apply -f issuer.yaml

Ahora configuraremos el Ingress para redirigir el tráfico HTTP a HTTPS usando el certificado generado.

No puedes tener un certificado válido y reconocido públicamente para https://localhost sin un dominio real.
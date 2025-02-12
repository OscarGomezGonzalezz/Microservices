FROM node:18
WORKDIR /app
COPY . .
#RUN npm install express Como sabemos que solo vamos a usar express lo podemos instalar directamente pero como
# en un futuro le puedo meter otros paquetes prefiero hacerlo con un package.json
RUN npm install
CMD ["node", "server.js"]

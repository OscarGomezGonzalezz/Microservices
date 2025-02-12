const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de las rutas
app.use("/api", apiRoutes);

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URL || "mongodb://mongo-service:27017/appDB")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error de conexión a MongoDB: ", err));

module.exports = app;

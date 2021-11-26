"use strict";

const bodyParser = require("body-parser");
const express = require("express");

const app = express();

//CARGAR ARCHIVOS DE RUTAS
const studentB_routes = require("./routes/studentB.route");

//MIDDLEWEARS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

//RUTAS
app.use("/api", studentB_routes);

//EXPORTAR
module.exports = app;

const bodyParser = require("body-parser");
const express = require("express");

const cookie = require("cookie-parser");
const app = express();
const route = require("./routes");
const connection = require("./database");
const port = 8000;

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL");
});

// Middleware pour éviter les problèmes de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Gestion des cookies
app.use(cookie());

// Middleware pour gérer les requêtes JSON
app.use(bodyParser.json());

app.use(route);

// Lancement du serveur Node.js
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});

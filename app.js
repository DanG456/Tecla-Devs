//Importamos los modulos necesarios
//Express
const http = require("http");
const express = require("express");
const app = express();
const sequelize = require("sequelize");
//CORS
const cors = require("cors");
//Dotenv
require("dotenv").config();
//Middleware
const midd = require("./midd/midd");
//Routes
const apiRouter = require("./app/vistas");
const bodyParser = require("body-parser");
//Modelos de BD
const UsersDB = require("./db/db.modelo.usuarios");
const TecnoDB = require("./db/db.modelo.tecnologias")
//Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//Iniciamos el servidor
async function serverStart(){
    try{
        await UsersDB.sync({alter: true});
        await TecnoDB.sync({alter: true});
        await sequelize.authenticate();
        console.log("Conexión con la base de datos establecida correctamente");
        app.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
        });
    }catch(error){
        console.error('No se pudo conectar correctamente con la base de datos');
    }
}

serverStart();

//Implementamos las vistas
app.use("/api", apiRouter);

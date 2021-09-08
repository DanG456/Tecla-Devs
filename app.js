//Importamos los modulos necesarios
//Express
const http = require('http');
const express = require('express');
const app = express();
const sequelize = require('sequelize');
//CORS
const cors = require('cors');
//Dotenv
require('dotenv').config();
//Middleware
const midd = require('./midd/midd');
//Routes
const Vistausuarios = require('./app/vista/vista.usuario');
const Vistatecnologia = require('./app/vista/vista.tecnologias');
const Vistaredes = require('./app/vista/vista.redes')
//Modelos de BD
const UsersDB = require('./db/db.modelo.usuarios');
const TecnoDB = require('./db/db.modelos.tecnologias')
const RedDB = require('./db/db.modelo.redes')
//Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(midd.limiter)

//Iniciamos el servidor
async function serverStart(){
    try{
        await UsersDB.sync({alter: true});
        await TecnoDB.sync({alter: true});
        await RedDB.sync({alter: true});
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
Vistausuarios(app);
Vistatecnologia(app);
Vistaredes(app);

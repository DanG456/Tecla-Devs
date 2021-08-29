//Se importan los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./connection')

//Modulo Usuarios
const net=sequelize.define('redes', {
    nombreRed:{
        type: DataTypes.STRING(30),
        primaryKey: true,
    },
    enlace: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
})

module.exports = net
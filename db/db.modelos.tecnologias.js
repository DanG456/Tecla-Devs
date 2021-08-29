//Se importan los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./connection')

//Modulo Usuarios
const tecnologies=sequelize.define('tecnologias', {
    nombreTec:{
        type: DataTypes.STRING(30),
        primaryKey: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
})

module.exports = tecnologies
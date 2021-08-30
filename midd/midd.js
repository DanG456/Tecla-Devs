//Importamos los modulos necesarios
const controllerUsers = require('../app/controlador/controlador.usuario')
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const Joi = require('joi');
const { loginDTO } = require('../app/controlador/controlador.usuario');
const { altaUserDTO } = require('../app/controlador/controlador.usuario');

module.exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'Usted exedió el limite de accesos a la API'
  });

module.exports.usuarioValido = async (req,res,next)=>{
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = await controllerUsers.verifyUser(token)
            req.params.usuario = verificado.data
            return next()
        }else{
            throw new Error ('Este es un sistema seguro y requiere autorización')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}

module.exports.isAdmin = async (req,res,next) => {
    try{
        req.body.esAdmin = true;
        
    }catch (err){
        console.log(err.message)
        res.status(500).json({error:err.message})
    }
}
module.exports.checkDatosLogin = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, loginDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.checkDatosAlta = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, altaUserDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
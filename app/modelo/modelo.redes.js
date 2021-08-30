//Se importan los modulos a utilizar
const { Model } = require('sequelize')
const sequelize = require('sequelize')
const Redes = require('../../db/db.modelo.redes')

//Exportamos los modulos a utilizar

module.exports.Mediaexists = async (sm) =>{
    let socialMedia = [sm.name]
    try {
        let resultado = await Redes.findOne({where: {name: `${socialMedia[0]}`}})
        console.log(resultado)
        if (resultado != null) {
            return true            
        }else {
            return false
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.delRedChk = async (sm) =>{
    let sociMed=[sm.nombreMedia]
    try{
        let smConfirmation = await Redes.findOne({where:{nombreMedia: `${sociMed[0]}`}})
        if(smConfirmation != null){
            await Redes.destroy({where:{nombreMedia: `${sociMed[0]}`}})
        }else{
            return false;
        }
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}



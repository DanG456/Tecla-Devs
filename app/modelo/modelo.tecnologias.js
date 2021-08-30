//Se importan los modulos a utilizar
const { Model } = require('sequelize')
const sequelize = require('sequelize')
const Tecnologias = require('../../db/db.modelos.tecnologias')

//Exportamos los modulos a utilizar

module.exports.Techexists = async (tech) =>{
    let technology = [tech.name]
    try {
        let resultado = await Tecnologias.findOne({where: {name: `${technology[0]}`}})
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

module.exports.delTechChk = async (nametech) =>{
    let tec=[nametech.nombre, nametech.apellidos]
    try{
        let tecConfirmation = await Tecnologias.findOne({where:{nombreTec: `${tec[0]}`}})
        if(tecConfirmation != null){
            await Tecnologias.destroy({where:{nombreTec: `${tec[0]}`}})
        }else{
            return false;
        }
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}



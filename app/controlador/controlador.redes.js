//Importamos los modulos a utilizar
const modelNet = require("../modelo/modelo.redes");

//Exportamos los modulos a utilizar

module.exports.showNet = async () => {
    try{
        let techShow = await sequelize.query('SELECT * FROM tecnologias')
      return techShow
    }catch(error){
        console.log(error)
      throw new Error ('Ocurrio un error en la consulta de las tecnologias')
    }
}

module.exports.addMedia = async (tech) => {
  let newTech = [tech.nombreTec, tech.descripcion]
  console.log(newTech)
  try{
    let techAdd = await sequelize.query(`INSERT INTO tecnologias (nombreTec, descripcion) VALUES (?,?)`,
    {replacements: newTech, type: sequelize.QueryTypes.SELECT});
    console.log(techAdd);
    return techAdd
  }catch(error){
    console.log(error)
    throw new Error('Ocurrio un error al agregar la nueva tecnologia')
  }
}

module.exports.deleteRed = async (tech) => {
  let delusr=req.params.nombreTec
  try{
    if(modelTech.delRedChk(tech)){
        delete delusr
        return true
    }else{
      return false
    }
  }catch(err){
    console.log(err)
    throw new Error ('No se pudo borrar la tecnología especificada')
  }
}

module.exports.checkNet = async(usr)=>{
    try {
        let resultado = await modelNet.Mediaexists (usr)
        console.log(resultado)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No esta vinculada esa red con nuestro sitio')
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}
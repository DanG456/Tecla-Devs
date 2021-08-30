//Importamos los modulos a utilizar
const modelTech = require("../modelo/modelo.tecnologias");

//Exportamos los modulos a utilizar

module.exports.showTech = async () => {
    try{
        let techShow = await sequelize.query('SELECT * FROM tecnologias')
      return techShow
    }catch(error){
        console.log(error)
      throw new Error ('Ocurrio un error en la consulta de las tecnologias')
    }
}

module.exports.addTech = async (tech) => {
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

module.exports.deleteTech = async (tech) => {
  let delusr=req.params.nombreTec
  try{
    if(modelTech.delTechChk(tech)){
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

module.exports.checkTech = async(tech)=>{
  try {
      let resultado = await modelTech.Techexists (tech)
      console.log(resultado)
      if (resultado) {
          return resultado
      }else {
          throw new Error ('Dicha tecnologia no esta registrada')
      }
  }catch (err) {
      console.log(err)
      throw new Error (err)
  }
}
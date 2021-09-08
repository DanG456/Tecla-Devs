//Importamos los modulos necesarios
const netController = require("../controlador/controlador.redes")
const midd = require("../../midd/midd")
//Preparamos nuestros endpoints
//Métodos GET
module.exports = async (app) => {
    app.get('/redes', async(req,res)=>{
        try {
            let resultado = await netController.showNet();
            res.status(200).json({ message: "Datos recuperados exitosamente", resultado})
            console.log(resultado);
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: "Error en el servidor", error: err.message})
        }
    });
}

//Métodos POST
module.exports = async (app) => {
    app.post("/addNet", async (req,res) => {
        try{
          const tech = await technoController.checkNet({ where: { nombreTech: req.body.nombreTech } });
          console.log(req.body.email)
          if (tech) {
            tech.technology = technoController.addMedia();
          }
        }catch(error){
          res
            .status()
            .render("404", {
              msj: error.message,
              titulo: "Error al agregar la red social indicada"
            })
        }
    });
}

//Métodos DELETE
module.exports = async (app) => {
    app.delete("/:delRed", async (req,res) => {
        try{
            const deltech = await netController.checkRed({ where: { nombreNet: req.body.nombreNet}})
            console.log(req.body.nombreNet)
            if(deltech) {
                del.tech = technoController.deleteRed(nombreNet)
            }
        }catch(error){
            res
                .status()
                .render("404", {
                    msj: error.message,
                    titulo: "Error al eliminar la red"
                })
        }
    });
}

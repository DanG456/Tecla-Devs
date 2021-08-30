//Importamos los modulos necesarios
const router = require('express').Router();
const technoController = require("../controlador/controlador.tecnologias")
const midd = require("../../midd/midd")
//Preparamos nuestros endpoints

router.get('/tecnologias', async(req,res)=>{
    try {
        let resultado = await technoController.showTech();
        res.status(200).json({ message: "Datos recuperados exitosamente", resultado})
        console.log(resultado);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Error en el servidor", error: err.message})
    }
})

router.post("/addTech", async (req,res) => {
    try{
      const tech = await technoController.checkTech({ where: { nombreTech: req.body.nombreTech } });
      console.log(req.body.email)
      if (tech) {
        tech.technology = technoController.addTech();
      }
    }catch(error){
      res
        .status()
        .render("404", {
          msj: error.message,
          titulo: "Error al agregar la tecnología"
        })
    }
});

router.delete("/delTech", async (req,res) => {
    try{
        const deltech = await technoController.checkTech({ where: { nombreTech: req.body.nombreTech}})
        console.log(req.body.nombreTech)
        if(deltech) {
            del.tech = technoController.deleteTech(nombreTec)
        }
    }catch(error){
        res
            .status()
            .render("404", {
                msj: error.message,
                titulo: "Error al eliminar la tecnologia"
            })
    }
});
//Importamos los modulos necesarios
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Usuario } = require("../../db/connection");
const userController = require("../controlador/controlador.usuario");
const midd = require('../../midd/midd')

//Preparamos nuestros endpoints
router.get('/usuarios', async(req,res)=>{
    try {
        let resultado = await controllerUsers.showUsers();
        res.status(200).json({ message: "Datos recuperados exitosamente", resultado})
        console.log(resultado);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Error en el servidor", error: err.message})
    }
})
router.post("/register", midd.checkDatosAlta, async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10); // aqui nos pasa la contraseña ya encriptada
    const user = await Usuario.create(req.body);
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .render("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
});

router.post("/login",  async (req, res) => {
  try {
    const user = await userController.checkUser({ where: { email: req.body.email } });
    console.log(req.body.email)
    if (user) {
      Usuario
      const iguales = bcrypt.compareSync(req.body.password, user.password);
      if (iguales) {
        let token = await userController.generaToken(req.body);
        res.json({usuario:user,token:token});
      } else {
        res.json("Usuario o contraseña no coinciden");
      }
    } else {
        res.json("Usuario o contraseña no coinciden");
    }
    
  } catch (error) {
    res
      .status(400)
      .render("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
});

router.put("/changePass", midd.usuarioValido, async (req, res) => {
  try {
    const user = await userController.checkUser({ where: { email: req.body.email } });
    console.log(req.body.email)
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 16);
      await user.save();
      res.json(user);
    } else {
        res.json("Usuario no encontrado");
    }
    
  } catch (error) {
    res
      .status(400)
      .render("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
});


module.exports = router;

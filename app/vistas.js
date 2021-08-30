//Exportamos las rutas que utilizaremos
const router = require("express").Router();
const apiTecnoRouter = require("./vista/vista.tecnologias");
const apiUsuariosRouter = require("./vista/vista.usuario");
const apiRedesRouter = require("./vista/vista.redes");
router.use("/Tecnologias", apiTecnoRouter);
router.use("/Usuarios", apiUsuariosRouter);
router.use("/Redes", apiRedesRouter);
module.exports = router;
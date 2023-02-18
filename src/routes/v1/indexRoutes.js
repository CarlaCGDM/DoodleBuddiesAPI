/* 
*   Aquí establecemos las rutas de los recursos que servirá nuestra API: usuarios y publicaciones. 
*/

const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes")
const postRoutes = require("./postRoutes")

// Ruta raíz de la aplicación: http://localhost:3001/api/v1

router.get("/", (req, res, next)=>{
    res.send(`<h1>¡Bienvenido a la API de DoodleBuddies!</h1>`)
})

// Rutas específicas de cada uno de los recursos (importadas desde los ficheros):
 
router.use("/usuarios",  userRoutes.router); // http://localhost:3001/api/v1/usuarios
router.use("/publicaciones",  postRoutes.router); // http://localhost:3001/api/v1/publicaciones

module.exports.router = router
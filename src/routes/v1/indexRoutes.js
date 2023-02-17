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







// PRUEBAS







const fs = require('fs');


// guardar imagenes (separar luego)

  const dataURLtoFile = (dataURL) => {
    let regex = /^data:.+\/(.+);base64,(.*)$/;

    let matches = dataURL.match(regex);
    let ext = matches[1];
    let data = matches[2];
    let buffer = Buffer.from(data, 'base64');

    fs.writeFileSync('./src/public/dibujos/data.' + ext, buffer);
  }

  router.post('/save-image', (req, res) => {
    
      const { body } = req;

      dataURLtoFile(body.image);
      
      console.log(body);
      return res.status(200).send(body.image).end();
  });

module.exports.router = router
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

// guardar imagenes (separar luego)

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/dibujos',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage
  }).single('image');

  router.post('/save-image', (req, res) => {
    upload(req, res, function (err) {
        const { file } = req;
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log(file);
      return res.status(200).send(file).end();
    });
  });

module.exports.router = router
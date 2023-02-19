/*
*   Rutas escpecíficas del recurso "usuarios" para las operaciones del CRUD.
*/

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController")

// http://localhost:3001/api/v1/usuarios

router.route("/") 
    .post(userController.createOneUser);

// http://localhost:3001/api/v1/usuarios/pagina/:page 

router.route("/pagina/:page")
    .get(userController.getAllUsers);

// http://localhost:3001/api/v1/usuarios/usuario/:id

router.route("/usuario/:id") 
    .get(userController.getOneUser)
    .put(userController.updateOneUser)
    .delete(userController.deleteOneUser);


module.exports.router = router;
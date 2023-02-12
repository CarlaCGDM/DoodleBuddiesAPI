/*
*   Rutas escpecíficas del recurso "usuarios" para las operaciones del CRUD.
*/

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController")

// http://localhost:3001/api/v1/publicaciones/

router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createOneUser);

// localhost:3001/api/v1/publicaciones/:id

router.route("/:id")
    .get(userController.getOneUser)
    .put(userController.updateOneUser)
    .delete(userController.deleteOneUser);

module.exports.router = router;
/*
*   Rutas escpecíficas del recurso "publicaciones" para las operaciones del CRUD.
*/

const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController")

// http://localhost:3001/api/v1/publicaciones/

router.route("/")
    .get(postController.getAllPosts)
    .post(postController.createOnePost);

// localhost:3001/api/v1/publicaciones/page/:page

router.route("/page/:page")
    .get(postController.getAllPosts);

// localhost:3001/api/v1/publicaciones/:id

router.route("/:id")
    .get(postController.getOnePost)
    .put(postController.updateOnePost)
    .delete(postController.deleteOnePost);

module.exports.router = router;
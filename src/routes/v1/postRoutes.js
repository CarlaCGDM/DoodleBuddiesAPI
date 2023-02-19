/*
*   Rutas escpecíficas del recurso "publicaciones" para las operaciones del CRUD.
*/

const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController")

// http://localhost:3001/api/v1/publicaciones

router.route("/")
    .post(postController.createOnePost);

// localhost:3001/api/v1/publicaciones/pagina/:page

router.route("/pagina/:page")
    .get(postController.getAllPosts);

// localhost:3001/api/v1/publicaciones/publicacion/:id

router.route("/publicacion/:id")
    .get(postController.getOnePost)
    .put(postController.updateOnePost)
    .delete(postController.deleteOnePost);

// http://localhost:3001/api/v1/usuarios/favoritos/:id/

router.route("/favoritos/:id")
    .get(postController.getUserLikes);

// http://localhost:3001/api/v1/usuarios/publicaciones/:id/


router.route("/usuario/:id")
    .get(postController.getUserPosts);

module.exports.router = router;
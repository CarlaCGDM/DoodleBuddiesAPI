const postModel = require("../database/postModel");
const imagehandler = require("../utils/imagehandler");

const {v4: uuid} = require("uuid");
const fs = require("fs");

const getAllPosts = (page) => {

    // Se llama a la función del modelo que obtiene todos los post

    const allPosts = postModel.getAllPosts(page ? page : 1); // Si no existe page, la página es la primera
    return allPosts;
}

const createOnePost = (postData) => {

    // Implementamos la lógica de negocio: las publicaciones deben tener fecha de alta y modificación,
    // y se identifican por un ID.

    const id = uuid();
    const newPost = {
        ...postData,
        fechaAlta: new Date().toLocaleString(),
        fechaModificacion: new Date().toLocaleString()
    };

    // Las imágenes de las publicaciones se reciben como dataURL y deben almacenarse en el directorio público
    // como ficheros, además de guardar su ruta en el objeto de la publicación.

    const imageName = `dibujos/image-${id}`;
    
    // TODO: Añadir una comprobación por si acaso se intenta guardar una imagen en un formato que no es jpeg.

    imagehandler.storeFileFromDataURL(newPost.imagen, imageName);

    newPost.imagen = `static/${imageName}.jpeg`;

    // Insertamos la nueva publicación en la BD

    const onePost = postModel.insertOnePost(id,newPost);
    return onePost;
}

const getOnePost = (id) => {

    //Obtenemos la información de la publicación.

    const onePost = postModel.getOnePost(id);
    return onePost;

};

const deleteOnePost = (id) => {
    const onePost = postModel.deleteOnePost(id)
    return onePost;
  };

const updateOnePost = (id,newPostData) => {
  
    // Obtiene el producto actual
    const postData = postModel.getOnePost(id);

    // Crea un producto nuevo cambiando la información en los campos necesarios
    for (const field in postData) {
        if (newPostData.hasOwnProperty(field)) {
            postData[field] = newPostData[field];
        }
    }

    postData["fechaModificacion"] = new Date().toLocaleString();

    // Actualiza el producto existente
    const newPost = postModel.updateOnePost(id,postData);
    
    return newPost;

};

// Las publicaciones creadas por un usuario concreto
const getUserPosts = (userid) => {

    const posts = postModel.getUserPosts(userid);
    return posts;

}

// Las publicaciones que un usuario ha guardado como favoritas
const getUserLikes = (userid) => {

    const posts = postModel.getUserLikes(userid);
    return posts;

}

module.exports = {
  getAllPosts,
  createOnePost,
  getOnePost,
  updateOnePost,
  deleteOnePost,
  getUserPosts,
  getUserLikes
};
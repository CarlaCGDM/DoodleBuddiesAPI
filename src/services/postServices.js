const postModel = require("../database/postModel");
const {v4: uuid} = require("uuid")

const getAllPosts = () => {

    // Se llama a la función del modelo que obtiene todos los post

    const allPosts = postModel.getAllPosts();
    return allPosts;
}

const createOnePost = (postData) => {

    // Implementamos la lógica de negocio: las publicaciones deben tener fecha de alta y modificación,
    // y se identifican por un ID.

    const id = uuid();
    const newPost = {
        ...postData,
        fechaAlta: new Date().toLocaleDateString(),
        fechaModificacion: new Date().toLocaleDateString()
    };

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

//-----

const updateOnePost = (id,newPostData) => {
  
    // Obtiene el producto actual
    const postData = postModel.getOnePost(id);
    console.log(newPostData);

    // Crea un producto nuevo cambiando la información en los campos necesarios
    for (const field in postData) {
        if (newPostData.hasOwnProperty(field)) {
            postData[field] = newPostData[field];
        }
    }

    postData.fechaModificacion = new Date().toLocaleDateString;

    // Actualiza el producto existente
    const newPost = postModel.updateOnePost(id,postData);
    
    return newPost;

};


module.exports = {
  getAllPosts,
  createOnePost,
  getOnePost,
  updateOnePost,
  deleteOnePost,
};
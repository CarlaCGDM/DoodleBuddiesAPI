/*  ------------------------------------------------------------------------------------------------------------ ||| INFO
*
*   Controlador del recurso "publicación".
*   El controlador se encarga de la lógica de la aplicación referente a las publicaciones.
*   Recibirá las peticiones HTTP y llamará a los servicios necesarios para devolver las respuestas correctas.
*
*/

const postServices = require("../services/postServices");

// Devuelve el listado completo de publicaciones que se han realizado en la aplicación, paginado, y empezando por la publicación más nueva.
const getAllPosts = (req, res, next) => {
  
  const page = req.params.page;  // Parametros de la URL

  const allPosts = postServices.getAllPosts(page);

  // Si no se encuentran publicaciones, devolvemos código de error 404 (recurso no encontrado).

  if (Object.keys(allPosts).length != 0) {

    res.send(allPosts);

  } else {

    res.status(404).send({mensaje: "¡No hay publicaciones ahí!"});

  }

  res.end();

};

// Crea una nueva publicación con los datos especificados en el cuerpo de la petición.
// La imagen especificada como dataURL se convierte en fichero y se almacena en el directorio público.

const createOnePost = (req, res, next) => {

  // Cuerpo de la petición HTTP

  const { body } = req;

  // Comprobamos que no faltan datos en el cuerpo de la petición HTTP

  if (!body.titulo || !body.autor || !body.imagen || !body.descripcion) {

    // Código HTTP 400: Bad request
    res.status(400).send({mensaje: "¡Las publicaciones deben incluir un título, una descripción, una imagen y un autor!"}); }

  else {

    // Creamos el objeto publicación que almacenaremos en la base de datos

    const newPostData = {
      "titulo":body.titulo,
      "autor":body.autor,
      "imagen":body.imagen,
      "favoritos":[],
      "descripcion":body.descripcion
    }

    // Llamamos al servicio para que cree la publicación

    const newPost = postServices.createOnePost(newPostData);

      if (newPost) {

        res.status(200).send({newPost,mensaje: "¡Publicación creada con éxito!"});

      } else {

        res.status(406).send({mensaje: "¡Algo ha ido mal, la publicación no se ha podido crear!"});

      }

  }
  
  res.end();

};

// Devuelve los datos de una publicación concreta especificada como parámetro de la URL de la petición.
const getOnePost = (req, res, next) => {

  // Id de la publicación

  const { id } = req.params;

  // Llamada al servicio

  const onePost = postServices.getOnePost(id);

  // Comprobamos que la publicación existe, si no existe, devolvemos un código 404 (file not found)

  if (onePost) {

    res.status(200).send(onePost);

  } else {

    res.status(404).send({ mensaje: "¡Parece que esa publicación no existe!" });

  }

  res.end();

};

// Elimina una publicación concreta especificada como parámetro de la URL de la petición junto con todos sus datos.
const deleteOnePost = (req, res, next) => {

  // Id de la publicación

  const { id } = req.params;

  // Borramos la publicación

  const deletedPost = postServices.deleteOnePost(id);

  // Comprobamos si se ha podido borrar correctamente o no

  if (!deletedPost) {

    res.status(404).send({mensaje: "¡No puedes borrar una publicación que no existe!"});

  } else {

    res.status(200).send({deletedPost,mensaje: "¡Publicación borrada correctamente!"});

  }

  res.end();

};


// Modifica los datos indicados de una publicación, dejando el resto de datos como están.
const updateOnePost = (req, res, next) => {

  // Id de la publicación

  const { id } = req.params;

  // Datos nuevos

  const { body } = req;

  // Comprobamos que exista la publicación

  const existe = postServices.getOnePost(id);

  if (existe) {

    const updatedPost = postServices.updateOnePost(id, body);

      if (updatedPost) {

        res.status(200).send({updatedPost,mensaje: "¡Publicación modificada con éxito!"});

      } else {

        res.status(406).send({mensaje: "¡Algo ha ido mal, la publicación no se ha podido modificar!"});

      }

  } else {

    res.status(404).send({mensaje: "¡No se puede modificar una publicación que no existe!"});

  }

  res.end();

}

// Devuelve todas las publicaciones creadas por el usuario especificado.
const getUserPosts = (req, res, next) => {

  // Id del usuario especificado

  const { id } = req.params;

  // Le pasamos los datos al servicio.

  const datos = postServices.getUserPosts(id);

  // Si se encuentran datos, se devuelven los datos junto a un código de éxito.
  // Si no se encuentran datos, se devuelve un mensaje de error junto a un código 404.

  if (datos) {

    res.status(200).send({datos});

  } else {

    res.status(404).send({ mensaje: "¡Ups, parece que ahí no hay nada!" });

  }

  res.end();

}

// Devuelve todas las publicaciones que el usuario especificado haya marcado como favoritas.
const getUserLikes = (req, res, next) => {

  // Id del usuario especificado

  const { id } = req.params;

  // Le pasamos los datos al servicio.

  const datos = postServices.getUserLikes(id);

  // Si se encuentran datos, se devuelven los datos junto a un código de éxito.
  // Si no se encuentran datos, se devuelve un mensaje de error junto a un código 404.

  if (datos) {

    res.status(200).send({datos});

  } else {

    res.status(404).send({ mensaje: "¡Ups, parece que ahí no hay nada!" });

  }

  res.end();

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
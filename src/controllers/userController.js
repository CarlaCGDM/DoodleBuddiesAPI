/*  ------------------------------------------------------------------------------------------------------------ ||| INFO
*
*   Controlador del recurso "usuarios".
*   El controlador se encarga de la lógica de la aplicación referente a los usuarios.
*   Recibirá las peticiones HTTP y llamará a los servicios necesarios para devolver las respuestas correctas.
*
*/

const userServices = require("../services/userServices");

// Devuelve el listado completo de usuarios registrados en la aplicación, paginado y empezando por el usuario más nuevo.
const getAllUsers = (req, res, next) => {

  const page = req.params.page;  // Parametros de la URL

  const allUsers = userServices.getAllUsers(page);

  // Si no se encuentran usuarios, devolvemos código de error 404 (recurso no encontrado).

  if (Object.keys(allUsers).length != 0) {

    res.status(200).send(allUsers);

  } else {

    res.status(404).send({mensaje: "¡No hay usuarios ahí!"});

  }

  res.end();

};

// Crea una nueva usuarios con los datos especificados en el cuerpo de la petición.
const createOneUser = (req, res, next) => {

    // Cuerpo de la petición HTTP

  const { body } = req;

  // Comprobamos que no faltan datos en el cuerpo de la petición HTTP

  if (!body.nombreusu || !body.email || !body.password) {

    // Código HTTP 400: Bad request
    res.status(400).send({mensaje: "¡Un usuario debe incluir al menos un nombre de usuario, una contraseña y un correo electrónico!"}); }

  else {

    // Creamos el objeto usuario que almacenaremos en la base de datos

    const newUserData = {
      "nombreusu": body.nombreusu,
      "email": body.email,
      "password": body.password,
      "avatar": body.avatar ? body.avatar : "static/avatares/default.jpeg", //si no hay avatar, el avatar por defecto
    }

    // Llamamos al servicio para que cree al nuevo usuario

    const newUser = userServices.createOneUser(newUserData);

      if (newUser) {

        res.status(200).send({newUser,mensaje: "¡Usuario creado con éxito!"});

      } else {

        res.status(406).send({mensaje: "¡Algo ha ido mal, el usuario no se ha podido crear!"});

      }

  }
  
  res.end();

};

// Devuelve los datos de un usuario concreto especificado (mediante id) como parámetro de la URL de la petición.
const getOneUser = (req, res, next) => {

  // Id de la publicación

  const { id } = req.params;

  // Llamada al servicio

  const oneUser = userServices.getOneUser(id);

  // Comprobamos que la publicación existe, si no existe, devolvemos un código 404 (file not found)

  if (oneUser) {

    res.status(200).send(oneUser);

  } else {

    res.status(404).send({ mensaje: "¡Parece que ese usuario no existe!" });

  }

  res.end();


};

// Elimina un usuario concreto especificado como parámetro de la URL de la petición.
const deleteOneUser = (req, res, next) => {

   // Id de la publicación

   const { id } = req.params;

   // Borramos la publicación
 
   const deletedUser = userServices.deleteOneUser(id);
 
   // Comprobamos si se ha podido borrar correctamente o no
 
   if (!deletedUser) {
 
     res.status(404).send({mensaje: "¡No puedes borrar un usuario que no existe!"});
 
   } else {
 
     res.status(200).send({deletedUser,mensaje: "¡Usuario borrado correctamente!"});
 
   }
 
   res.end();

};


// Modifica los datos indicados del usuario especificado como parámetro, dejando el resto de datos como están.
const updateOneUser = (req, res, next) => {

  // Id de la publicación

  const { id } = req.params;

  // Datos nuevos

  const { body } = req;

  // Comprobamos que exista la publicación

  const existe = userServices.getOneUser(id);

  if (existe) {

    const updatedUser = userServices.updateOneUser(id, body);

      if (updatedUser) {

        res.status(200).send({updatedUser,mensaje: "¡Usuario modificado con éxito!"});

      } else {

        res.status(406).send({mensaje: "¡Algo ha ido mal, el usuario no se ha podido modificar!"});

      }

  } else {

    res.status(404).send({mensaje: "¡No se puede modificar un usuario que no existe!"});

  }

  res.end();

}

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
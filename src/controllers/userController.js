/*  ------------------------------------------------------------------------------------------------------------ ||| INFO
*
*   Controlador del recurso "publicación".
*   El controlador se encarga de la lógica de la aplicación referente a las publicaciones.
*   Recibirá las peticiones HTTP y llamará a los servicios necesarios para devolver las respuestas correctas.
*
*/

const UserServices = require("../services/UserServices");


/*  ------------------------------------------------------------------------------------------------------------ ||| GET ALL USERS
*
*   --> GET /api/v1/publicaciones
*   Devuelve el listado completo de publicaciones que se han realizado en la aplicación.
*
*/

const getAllUsers = (req, res, next) => {


};

/*  ------------------------------------------------------------------------------------------------------------ ||| CREATE NEW USER
*
*   --> User /api/v1/publicaciones
*   Crea una nueva publicación con los datos especificados en el cuerpo de la petición.
*
*/

const createOneUser = (req, res, next) => {



};

/*  ------------------------------------------------------------------------------------------------------------ ||| GET ONE USER
*
*   --> GET /api/v1/publicaciones/:id
*   Devuelve los datos de una publicación concreta especificada como parámetro de la URL de la petición.
*
*/

const getOneUser = (req, res, next) => {


};

/*  ------------------------------------------------------------------------------------------------------------ ||| DELETE ONE USER
*
*   --> DELETE /api/v1/publicaciones/:id
*   Elimina una publicación concreta especificada como parámetro de la URL de la petición junto con todos sus datos.
*
*/

const deleteOneUser = (req, res, next) => {


};

/*  ------------------------------------------------------------------------------------------------------------ ||| UPDATE ONE USER
* 
*   --> PATCH /api/v1/publicaciones/:id
*   Modifica los datos indicados de una publicación, dejando el resto de datos como están.
*
*/

const updateOneUser = (req, res, next) => {


}

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
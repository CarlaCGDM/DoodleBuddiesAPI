const userModel = require("../database/userModel");

const {v4: uuid} = require("uuid");
const fs = require("fs");

const getAllUsers = (page) => {

    // Se llama a la función del modelo que obtiene todos los user

    const allusers = userModel.getAllUsers(page ? page : 1); // Si no existe page, la página es la primera
    return allusers;
}

const createOneUser = (userData) => {

    // Implementamos la lógica de negocio: las publicaciones deben tener fecha de alta y modificación,
    // y se identifican por un ID.

    const id = uuid();
    const newuser = {
        ...userData,
        fechaAlta: new Date().toLocaleString(),
        fechaModificacion: new Date().toLocaleString()
    };

    // Insertamos la nueva publicación en la BD
    const oneuser = userModel.insertOneUser(id,newuser);
    return oneuser;
}

const getOneUser = (id) => {

    //Obtenemos la información de la publicación.

    const oneuser = userModel.getOneUser(id);
    return oneuser;

};

const deleteOneUser = (id) => {
    const oneuser = userModel.deleteOneUser(id)
    return oneuser;
  };

//-----

const updateOneUser = (id,newuserData) => {
  
    // Obtiene el producto actual
    const userData = userModel.getOneUser(id);

    // Crea un producto nuevo cambiando la información en los campos necesarios
    for (const field in userData) {
        if (newuserData.hasOwnProperty(field)) {
            userData[field] = newuserData[field];
        }
    }

    userData["fechaModificacion"] = new Date().toLocaleString();

    // Actualiza el producto existente
    const newuser = userModel.updateOneUser(id,userData);
    
    return newuser;

};


module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
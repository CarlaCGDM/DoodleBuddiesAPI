const datos = require("./usuarios.json")
const fs = require("fs")

const getAllUsers = (page) => {

    // TODO: Dejar al cliente elegir si las más antiguas o las más nuevas primero mediante un parámetro booleano "asc".

    const perPage = 20;

    const start = perPage * (page - 1);
    const end = perPage * page;

    return Object.entries(datos.usuarios).sort((a, b) => a.fechaAlta > b.fechaAlta ? 1 : -1).slice(start,end).map(entry => entry[1]);
    
}

const getOneUser = (id) => {

    const oneUser = datos.usuarios[id];
    return oneUser
}

const insertOneUser = (id,usuario,imageFile) => {

    // Modificamos el objeto datos
    datos.usuarios[id] = usuario;

    // Escribimos los nuevos datos en el fichero JSON
    fs.writeFileSync(
        "./src/database/usuarios.json",
        JSON.stringify(datos, null, 2),
        "utf8"
    );
    
    return usuario;
}

const updateOneUser= (id, nuevosDatos) => {
    
    // Comprobamos que exista la publicación
    const oneUser = getOneUser(id);

    if (!oneUser) {

        return false;

    } else {
        
        // Cambiamos los datos
        datos.usuarios[id] = nuevosDatos;

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/usuarios.json",
            JSON.stringify(datos, null, 2),
            "utf8"
        );

        return oneUser;

    }
}

const deleteOneUser = (id) => {

    // Vemos si existe el usuario
    const oneUser = getOneUser(id);

    if (!oneUser) {

        return false;

    } else {
        
        // Borramos el producto del objeto datos
        delete datos.usuarios[id];

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/usuarios.json",
            JSON.stringify(datos, null, 2),
            "utf8"
        );

        return oneUser;

    }
    
  };

module.exports = {
    getAllUsers,
    getOneUser,
    insertOneUser,
    deleteOneUser,
    updateOneUser
}
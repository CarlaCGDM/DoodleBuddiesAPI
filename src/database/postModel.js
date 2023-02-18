const datos = require("./publicaciones.json")
const fs = require("fs")

const getAllPosts = (page) => {

    const perPage = 8;

    const start = perPage * (page - 1);
    const end = perPage * page;

    return Object.entries(datos.publicaciones).slice(start,end).map(entry => entry[1]);
    
}

const getOnePost = (id) => {
    const onePost = datos.publicaciones[id]
    return onePost
}

const insertOnePost = (id,publicacion,imageFile) => {

    // Modificamos el objeto datos
    datos.publicaciones[id] = publicacion;

    // Escribimos los nuevos datos en el fichero JSON
    fs.writeFileSync(
        "./src/database/publicaciones.json",
        JSON.stringify(datos, null, 2),
        "utf8"
    );
    
    return publicacion;
}

const deleteOnePost = (id) => {

    // Vemos si existe el producto
    const onePost = getOnePost(id);

    if (!onePost) {

        return false;

    } else {
        
        // Borramos el producto del objeto datos
        delete datos.publicaciones[id];

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/publicaciones.json",
            JSON.stringify(datos, null, 2),
            "utf8"
        );

        return onePost;

    }
    
  };

  const updateOnePost = (id, nuevosDatos) => {
    
    // Comprobamos que exista la publicación
    const onePost = getOnePost(id);

    if (!onePost) {

        return false;

    } else {
        
        // Cambiamos los datos
        datos.publicaciones[id] = nuevosDatos;

        // Escribimos los nuevos datos en el fichero JSON
        fs.writeFileSync(
            "./src/database/publicaciones.json",
            JSON.stringify(datos, null, 2),
            "utf8"
        );

        return onePost;

    }
  }

module.exports = {
    getAllPosts,
    getOnePost,
    insertOnePost,
    deleteOnePost,
    updateOnePost
}
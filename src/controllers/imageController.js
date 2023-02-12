//get one image

const getOneImage = (req, res, next) => {

    // Ver si existe la imagen
  
    const { id } = req.params;
  
    console.log(id);

  
    res.send(`http://localhost:3001/static/dibujos/${id}.jpeg`);
    res.end();     
  
  };

  module.exports = {
    getOneImage
  };
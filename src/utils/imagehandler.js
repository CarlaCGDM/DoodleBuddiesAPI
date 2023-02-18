const fs = require("fs");

const storeFileFromDataURL = (dataURL, imageName) => {
    let regex = /^data:.+\/(.+);base64,(.*)$/;

    let matches = dataURL.match(regex);
    let ext = matches[1];
    let data = matches[2];
    let buffer = Buffer.from(data, 'base64');

    fs.writeFileSync(`./src/public/${imageName}.${ext}`, buffer);
  }

module.exports = {
    storeFileFromDataURL,
};
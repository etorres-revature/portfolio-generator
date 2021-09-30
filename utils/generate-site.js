const fs = require("fs");

const writeFile = (fileContent, outputdir) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputdir + "/index.html", fileContent, (err) => {
      // if there's an error, reject the promise and send the error to the Promise's .catch() method
      if (err) {
        reject(err);
        // return out of the function to make sure the Promise doesn't execute the resolve function
        return;
      }
      resolve({
        ok: true,
        message: "The portfolio website has been created!",
      });
    });
  });
};

const copyFile = (outputdir) => {
  return new Promise((resolve, reject) => {
    fs.copyFile("./src/style.css", outputdir + "/style.css", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "Style sheet copied successfully!",
      });
    });
  });
};

module.exports = {
  writeFile,
  copyFile,
};

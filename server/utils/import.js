const { parse } = require("csv");
const fs = require("fs");

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        reject(err);
      }
      parse(data, { columns: true }, (err, output) => {
        if (err) {
          reject(err);
        }
        resolve(output);
        console.log(output)
      });
    });
  });
}
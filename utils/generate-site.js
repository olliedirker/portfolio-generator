const fs = require('fs');
const { resolve } = require('path');
// const copyFile = () => {};

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there an error, reject the Promise and send the error to the promise's `.catch` method
            if (err) {
                //return out of the function here to make sure the Promise doesnt accidentally execute the resolve() function as well
                return;
            }

            //if everything went well, resolve the promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};
module.exports = { writeFile, copyFile } = require('./utils/generate-site.js');
const fs = require('fs').promises;
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true })
  .catch(copy)
  .then(copy);

function copy() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true })
    .then(() => fs.readdir(path.join(__dirname, 'files')))
    .then((filesArray) => {
      for (const file of filesArray) {
        fs.copyFile(`${path.join(__dirname, 'files', file)}`, `${path.join(__dirname, 'files-copy', file)}`);
      }
    });
}

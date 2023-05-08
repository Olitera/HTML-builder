const fs = require('fs');
const path = require('path');
let readStream;
let arr = [];
let count = 0;
let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    fs.stat(`${path.join(__dirname, 'styles', files[i])}`, (err, stats) => {
      if (stats.isFile() && path.extname(files[i]) === '.css') {
        count++;
        readStream = fs.createReadStream(path.join(__dirname, 'styles', files[i]), 'utf-8');
        readStream.on('data', chunk => {
          arr.push(chunk);
          if (arr.length === count) {
            writeStream.write(arr.join('\n\n'));
          }
        });
      }
    });
  }
});


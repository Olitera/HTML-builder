const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

let readStream;
let readHtml;
let writeHTML;
let htmlCount = 0;
let sum = 0;

let readStyles;
let arr = [];
let count = 0;
let writeStyles
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {
  writeStyles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'styles.css'));
});
// writeStyles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'styles.css'));



readStream = fs.createReadStream(path.join(__dirname, 'template.html'));
let Html = '';
readStream.on('data', chunk => Html += chunk);
readStream.on('end', () => { return Html });


fs.readdir(path.join(__dirname, 'components'), (err, files) => {
  for (let i = 0; i < files.length; i++) {
    fs.stat(`${path.join(__dirname, 'components', files[i])}`, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        if (path.extname(files[i]) === '.html') {
          htmlCount++;
          readHtml = fs.createReadStream(path.join(__dirname, 'components', files[i]));
          readHtml.on('data', chunk => {
            Html = Html.replace(files[i].padStart(files[i].length + 2, '{{').padEnd(files[i].length + 4, '}}'), chunk);
            sum++;
            if (htmlCount === sum) {
              writeHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
              writeHTML.write(Html);
              // console.log('bvhh')
            }
          });
        } else {
          copy();
        }
      }
    });
  }
})

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    fs.stat(`${path.join(__dirname, 'styles', files[i])}`, (err, stats) => {
      if (stats.isFile() && path.extname(files[i]) === '.css') {
        count++;
        readStyles = fs.createReadStream(path.join(__dirname, 'styles', files[i]), 'utf-8');
        readStyles.on('data', chunk => {
          arr.push(chunk);
          if (arr.length === count) {
            writeStyles.write(arr.join('\n\n'));
          }
        });
      }
    });
  }
});

// fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true })
//     .then(() => fsPromises.readdir(path.join(__dirname, 'assets')))
//     .then((filesArray) => {
//       console.log(filesArray);
//       // for (const file of filesArray) {
//       //   fsPromises.copyFile(`${path.join(__dirname, 'assets', file)}`, `${path.join(__dirname, 'project-dist', 'assets', file)}`);
//       // }
//     });
let currentDir = path.join(__dirname, 'project-dist', 'assets');
let assetsDir = path.join(__dirname, 'assets');

function copy(dirName, assetsDir) {
  fsPromises.mkdir(currentDir, { recursive: true })
    .then(() => fsPromises.readdir(assetsDir))
    .then((filesArray) => {
      console.log(filesArray);
      for (const file of filesArray) {
        fs.stat(path.join(assetsDir, file), (err, stats) => {
          if (err) throw err;
          if (stats.isFile()) {

            // fsPromises.copyFile(`${path.join(__dirname, 'assets', file)}`, `${path.join(__dirname, 'project-dist', 'assets', file)}`);
          } else {
            console.log('hjhkjh')
            copy(`${dirName}/${file}`)
          }
        })
      }
    });
}

copy(currentDir, assetsDir);




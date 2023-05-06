const fs = require('fs');
const path = require('path');
const mainPath = `${__dirname}/secret-folder`;

fs.readdir(mainPath, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    fs.stat(mainPath + '/'+ files[i], (err, stats) => {
      if (stats.isFile()) {
        console.log(`${path.basename(files[i], path.extname(files[i]))} - ${path.extname(files[i]).slice(1)} - ${stats["size"]}b`);
      }
    })  
}
});





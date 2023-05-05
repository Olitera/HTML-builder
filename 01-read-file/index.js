const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
let all = '';
readStream.on('data', chunk => all += chunk);
readStream.on('end', () => console.log(all));


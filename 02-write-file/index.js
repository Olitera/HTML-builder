const { error } = require('console');
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text2.txt'));

const { stdin, stdout} = process;

stdout.write('Hello, let\'s do it\n');
stdin.on('data', all => {
    output.write(all);
    if (all.toString() === 'exit\n') {process.exit()}
    
});

process.on('exit', () => stdout.write('Good luck'));
process.on('SIGINT', () => process.exit());


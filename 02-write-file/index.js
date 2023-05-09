const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text2.txt'));

const { stdin, stdout} = process;

stdout.write('Hello, let\'s do it\n');
stdout.write('exit работает только с новой строки (после нажатия на enter), чтобы не было проблем, если текст случайно содержит exit.\n Если вы считаете, что выходить должно, когда текст содержит exit - используйте строку 12 вместо 13\n');

stdin.on('data', all => {
  // if (all.toString().toLowerCase().includes('exit')) {process.exit();
  if (all.toString().toLowerCase() === 'exit\n') {process.exit();
  } else {
    output.write(all);
  }
});

process.on('exit', () => stdout.write('\nGood luck\n'));
process.on('SIGINT', () => process.exit());


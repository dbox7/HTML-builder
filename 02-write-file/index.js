const fs = require('fs');
const path = require('path');
const readline = require('readline');

let txt = '';
console.log('Enter text');

function wf(data) {
  fs.writeFile(
    path.join(__dirname, 'text.txt'), 
    data,
    (err) => {
      if (err) throw err;
    });
}

const rl = readline.createInterface({ 
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', input => {
  if (input.toString().trim() == 'exit') {
    rl.close();
  } else {
    txt += input + '\n';
    wf(txt);
  }
});

rl.on('close', () => {
  console.log('Bye');
});
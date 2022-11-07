const fs = require('fs');
const path = require('path');
const read = fs.createReadStream(path.join(__dirname, 'text.txt'));

let data = '';

read.on('data', chunk => data += chunk);
read.on('end', () => console.log(data));
read.on('error', error => console.log('Error', error.message));
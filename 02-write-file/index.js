const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

function writeFile(data) {
    fs.writeFile(
        path.join(__dirname, 'text.txt'), 
        data,
        (err) => {
            if (err) throw err;
            console.log('Файл был создан');
    });
}

stdout.write('Enter text\n');
stdin.on('data', data => {
    writeFile(data);
    //process.exit();
});
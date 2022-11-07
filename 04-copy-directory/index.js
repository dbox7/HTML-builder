const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {if (err) console.log(err)});

fs.readdir(
    path.join(__dirname, 'files'), 
    (err, files) => {
        files.forEach(file => {
            fs.copyFile(
                path.join(__dirname, 'files', file), 
                path.join(__dirname, 'files-copy', file), 
                err => err,
            );
        });
    }
);

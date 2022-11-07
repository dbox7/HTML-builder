const fs = require('fs');
const path = require('path');

function show(file) {
    const type = path.extname(file.name);
    fs.stat(path.join(__dirname, 'secret-folder', file.name), function(err, stats) {
        console.log(`${file.name} - ${type} - ${stats.size / 1000}Kb`);
    });   
}

fs.readdir(
    path.join(__dirname, 'secret-folder'), 
    { withFileTypes: true },
    (err, files) => {
        files = files.filter(file => file.isFile());
        files.forEach(file => show(file));
    }
);
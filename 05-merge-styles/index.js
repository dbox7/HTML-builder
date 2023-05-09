const fs = require('fs');
const path = require('path');

let data = '';

fs.readdir(
  path.join(__dirname, 'styles'), 
  { withFileTypes: true },
  (err, files) => {
    files = files.filter(file => {
      const type = path.extname(file.name);
      if (file.isFile() && type === '.css') {
        return file;
      }
    });
    files.forEach(file => {
      const read = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      read.on('data', chunk => {
        data += chunk;
      });
      read.on('end', () => {
        fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      });
      read.on('error', error => console.log('Error', error.message));
    });
  }
);
const fs = require('fs');
const path = require('path');


// fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {console.log(err)});
// fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {});

fs.access(path.join(__dirname, 'files-copy'), async error => {
  if (error) {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {});
    copyFile();
  } else {
    await fs.promises.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {console.log(err)});
    await fs.promises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {});
    copyFile();
  }
})

function copyFile() {
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
}


const fs = require('fs');
const path = require('path');
const read = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

let data = '';

function getBlockName(chunk) {
  const start = chunk.search(/{{./g);
  const end = chunk.search(/.}}/g);
  return chunk.slice(start + 2, end + 1);
}

async function getData(chunk) {
  let tmp; 
  while (chunk.search(/{{.{1,}}}/g) !== -1) {
    const blockName = getBlockName(chunk);
    
    const files = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
    const file = files.find(file => {
      const type = path.extname(file.name);
      const name = (file.name).slice(0, -5);
      if (type === '.html' && name === blockName) {
        return file;
      }
    });

    tmp = await fs.promises.readFile(path.join(__dirname, 'components', file.name), 'utf-8');
    if (tmp) {
      const idx = chunk.search(`{{${blockName}}}`);
      chunk = chunk.replace(chunk.substr(idx, blockName.length + 4), tmp);
    }
  }
  return data += chunk;
};

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), (err) => {});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), (err) => {});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), (err) => {});

fs.readdir(
  path.join(__dirname, 'assets'), 
  (err, folders) => {
    folders.forEach(folder => {
      fs.readdir(
        path.join(__dirname, 'assets', folder), 
        (err, files) => {
          files.forEach(file => {
            fs.copyFile(
              path.join(__dirname, 'assets', folder, file), 
              path.join(__dirname, 'project-dist', 'assets', folder, file), 
              err => err,
            );
          });
        }
      );
    })
  }
);

read.on('data', async chunk => {
  data = await getData(chunk);
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    data,
    (err) => {
        if (err) throw err;
        console.log('Файл был создан');
    }
  );
});

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
    let data = '';
    files.forEach(file => {
      const read = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      read.on('data', chunk => {
        data += chunk;
      });
      read.on('end', () => {
        fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
          if (err) throw err;
        });
      });
      read.on('error', error => console.log('Error', error.message));
    });
  }
);

read.on('error', error => console.log('Error', error.message));
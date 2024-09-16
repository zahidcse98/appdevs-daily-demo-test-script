// deleteHtmlFiles.js
const fs = require('fs');
const path = require('path');

function deleteHtmlFiles(directory) {
  console.log('Deleting .html files in:', directory);

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.html')) {
        const filePath = path.join(directory, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted HTML file: ${file}`);
      }
    });

    if (!files.some(file => file.endsWith('.html'))) {
      console.log('No .html files to delete');
    }
  });
}

module.exports = deleteHtmlFiles;

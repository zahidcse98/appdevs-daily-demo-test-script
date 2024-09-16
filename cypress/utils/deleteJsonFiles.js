// deleteJsonFiles.js
const fs = require('fs');
const path = require('path');

function deleteJsonFiles(directory) {
  console.log('Deleting .json files in:', directory);

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(directory, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted JSON file: ${file}`);
      }
    });

    if (!files.some(file => file.endsWith('.json'))) {
      console.log('No .json files to delete');
    }
  });
}

module.exports = deleteJsonFiles;

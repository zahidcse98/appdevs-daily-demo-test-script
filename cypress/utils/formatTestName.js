const path = require('path');

const formatTestName = (fileName) => {
    const nameWithoutExtension = path.parse(fileName).name;
    
    return nameWithoutExtension
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z])([a-z])/g, '$1 $2')
      .replace(/_/g, ' ');
  }

module.exports = formatTestName;
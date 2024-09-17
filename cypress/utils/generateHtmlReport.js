const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { writeFileSync } = require('fs');
const deleteJsonFiles = require('../utils/deleteJsonFiles');
const formatTestName = require('../utils/formatTestName');

// Function to read JSON files
const readJsonFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};



// Function to generate HTML report for a single file
const generateHtmlReport = (results, fileName, totalTests, totalSuccess, totalFailed) => {
    
    const testName = formatTestName(fileName);
    let rows = results.map(result => `
        <tr>
            <td>${result.site}</td>
            <td>${result.url}</td>
            <td>${result.user}</td>
            <td>${result.password}</td>
            <td class="${result.status.toLowerCase()}">${result.status}</td>
            <td>${result.timestamp}</td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Results</title>
    <link
      rel="icon"
      href="https://appdevs.net/assets/backend/images/web-settings/image-assets/seeder/white-fav.webp"
      type="image/x-icon"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f9;
        color: #333;
        max-width: 100%;
        overflow-x: hidden;
      }
      h1 {
        text-align: center;
        color: #4a4a8c;
        margin: 20px 0;
        padding: 0 10px;
      }
      .logo-container {
        display: flex;
        justify-content: center;
        background-color: #333;
        /* Dark background for visibility */
        padding: 10px;
        border-radius: 8px;
        margin: 10px auto;
        max-width: 200px;
      }
      .logo {
        max-width: 150px;
        height: auto;
      }
      .container {
        width: 90%;
        margin: 0 auto;
        max-width: 1200px;
        padding: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 0.9em;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
      }
      th,
      td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
        word-break: break-word;
      }
      th {
        background-color: #4a4a8c;
        color: #fff;
      }
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      tr:hover {
        background-color: #f1f1f1;
      }
      .success {
        color: green;
        font-weight: bold;
      }
      .failed {
        color: red;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9em;
        color: #666;
        padding: 10px;
      }
      @media (max-width: 768px) {
        table {
          font-size: 0.8em;
        }
        th,
        td {
          padding: 8px;
        }
      }
      @media (max-width: 480px) {
        h1 {
          font-size: 1.2em;
        }
        .container {
          width: 95%;
          padding: 5px;
        }
        .logo-container {
          max-width: 120px;
          padding: 8px;
        }
        th,
        td {
          padding: 6px;
        }
      }
      @media (max-width: 320px) {
        th,
        td {
          font-size: 0.75em;
          padding: 4px;
        }
        .logo-container {
          max-width: 100px;
        }
      }
    </style>
  </head>
  <body>
    <!-- Company Logo with Background -->
    <div class="logo-container">
      <img
        src="https://appdevs.net/assets/frontend/images/logo/BLUE-in-white.png"
        alt="Company Logo"
        class="logo"
        href="https://appdevs.net"
      />
    </div>

    <div class="container">
      <h1>${testName}</h1>

      <!-- Summary Table -->
      <table>
        <thead>
          <tr>
            <th>Total Number of Tests</th>
            <th>Success</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${totalTests}</td>
            <td class="success">${totalSuccess}</td>
            <td class="failed">${totalFailed}</td>
          </tr>
        </tbody>
      </table>

      <!-- Detailed Results Table -->
      <table>
        <thead>
          <tr>
            <th>Site</th>
            <th>URL</th>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="footer">
        Developed in
        <a href="https://appdevs.net" target="_blank">AppDevs</a> with ♥ by
        <a href="mailto:zahid@appdevs.team">zahidcse98</a>
      </div>
    </div>
  </body>
</html>

    `;
};

// Read all JSON files from the 'results' directory
const resultsDir = path.join(__dirname, 'Json');
console.log("🚀 ~ resultsDir:", resultsDir)
const resultFiles = fs.readdirSync(resultsDir).filter(file => file.endsWith('.json'));

resultFiles.forEach(file => {
    const filePath = path.join(resultsDir, file);
    const results = readJsonFile(filePath);
    

    
    //count result
    const totalTests = results.length;
    const totalSuccess = results.filter(result => result.status === 'success').length;
    const totalFailed = totalTests - totalSuccess;
    
    // Generate the HTML report
    const htmlReport = generateHtmlReport(results, file, totalTests, totalSuccess, totalFailed);
    
    // Save the HTML report
    const outputFilePath = path.join(__dirname, 'Html', `${path.basename(file, '.json')}.html`);
    writeFileSync(outputFilePath, htmlReport, 'utf8');
    
});


const JsonFilesDir = path.join(__dirname, 'Json');
deleteJsonFiles(JsonFilesDir);

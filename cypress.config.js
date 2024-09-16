const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const deleteJsonFiles = require('./cypress/utils/deleteJsonFiles');
const deleteHtmlFiles = require('./cypress/utils/deleteHtmlFiles');

module.exports = defineConfig({

  

  e2e: {
    setupNodeEvents(on, config) {

      on('task',{
        deleteHtmlFilesTask() {
          const HtmlFilesDir = path.join(__dirname, 'cypress/CustomReport/Html')
          deleteHtmlFiles(HtmlFilesDir);
          return null;
        },

        deleteJsonFilesTask() {
          const JsonFilesDir = path.join(__dirname, 'cypress/CustomReport/Json');
          deleteJsonFiles(JsonFilesDir);
          return null;
        }
        
      });
      // implement node event listeners here
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Add incognito mode flag
          launchOptions.args.push('--incognito');
        }
        return launchOptions;
      })
      
    },
  },
});

// Import data

const sites = require('../fixtures/adminCredentials.json');
const  {format} = require('date-fns')

let results = [];

before(() => {
    cy.task('deleteHtmlFilesTask');
   // cy.task('deleteJsonFilesTask');
});
for (const site of sites) {

describe(`${site.name} Daily Demo Admin Login Test`, () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    })
    // Iterate through each site


        it(`should login successfully to ${site.name} Admin Panel`, () => {
            // Visit the login page of the current site
            cy.customVisit(site.url);
            // Enter username and password
            cy.get('input[type=text]').clear().type(site.username);
            cy.get('input[type=password]').clear().type(site.password, {force: true});
            // Submit the login form
            cy.get('button[type=submit]').first().click();

            // Validate login success by checking URL or dashboard elements
            cy.url().then((url) => {
                expect(url, `Unable to login to the ${site.name}'s Admin Dashboard`).not.to.include('/login');
                expect(url, `UserName: ${site.username} or Password: ${site.password} may be invalid`).to.include('/dashboard');
            });
        });
        afterEach(function () {
            // The 'site' variable is still properly scoped due to 'for-of' loop
            const testStatus = this.currentTest.state === 'failed' ? 'failed' : 'success';
    
            let result = {
                testName: 'Daily Demo Admin Login Test',
                site: site.name,
                url: site.url,
                user: site.username,
                password: site.password,
                status: testStatus,
                timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ss a')
            };
            console.log("Site name:", site.name); // Check which site name is logged
            console.count();
            results.push(result);
        });

    });

    // After all tests, write to a JSON file
    after(() => {
        cy.writeFile('cypress/CustomReport/Json/UserDemoAdminResults.json', results);
    });
};

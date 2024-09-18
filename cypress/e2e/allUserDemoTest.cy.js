// Import data
const sites = require('../fixtures/allUserTestDemoCredentials.json');
const { format } = require('date-fns');

let results = []; // Accumulate results across all tests

before(() => {
    cy.task('deleteHtmlFilesTask');
   // cy.task('deleteJsonFilesTask');
});
for (const site of sites) {
    // Delete the existing testresults.json before starting tests
    // Iterate through each site using a traditional loop to ensure proper scoping

        describe(`${site.name}'s Daily Demo User Login Test`, () => {
            beforeEach(() => {
                cy.clearCookies();
                cy.clearLocalStorage();
                //results = []
            });
        it(`should login successfully to ${site.name}`, () => {
            // Visit the login page of the current site
            cy.customVisit(site.url);

            if (site.type === 'page') {
                // Handle the input fields for username
                const selectors = [
                    'input[type=email][name="credentials"]',
                    'input[type=text][name="credentials"]',
                ];

                cy.wrap(selectors).each((selector) => {
                    cy.get('body').then(($body) => {
                        if ($body.find(selector).length) {
                            cy.get(selector).clear({ force: true }).type(site.username, { force: true });
                            return false; // Exit the loop once we find a match
                        }
                    });
                });

                // Handle password input field
                if (site.name === "ADChange") {
                    cy.get('input[type=password]').last().type(site.password, { force: true });
                } else {
                    cy.get('input[type=password]').clear({ force: true }).type(site.password, { force: true });
                }

                // Submit the login form
                if (site.name === "ADChange") {
                    cy.get('button[type=submit]').last().click({ force: true });
                } else {
                    cy.get('button[type=submit]').first().click({ force: true });
                }

            } else {
                // For alternative login flow
                const loginBtnSelectors = [
                    '.header-account-btn',
                    '.account-area-btn',
                    '.header-account-button-thumb-area',
                ];
                let elementFound = false;
                cy.wrap(loginBtnSelectors).each((selector) => {
                    if (elementFound) {
                        return false;
                    }
                    cy.get('body').then(($body) => {
                        if ($body.find(selector).length) {
                            cy.get(selector).first().click({ force: true });
                            elementFound = true; // Mark that we've found and clicked
                            return false; // Exit loop after finding the button
                        }
                    });
                }).then(() => {
                    // Handle the input fields for username
                    const emailInputBoxSelectors = [
                        'input[type=email][name="credentials"]',
                        'input[type=text][name="credentials"]',
                    ];

                    cy.wrap(emailInputBoxSelectors).each((selector) => {
                        cy.get('body').then(($body) => {
                            if ($body.find(selector).length) {
                                cy.get(selector).clear({ force: true }).type(site.username, { force: true });
                                return false; // Exit the loop once we find a match
                            }
                        });
                    });

                    // Handle password input field
                    cy.get('input[type=password]').first().clear({ force: true }).type(site.password, { force: true });

                    // Submit the login form
                    cy.get('button[type=submit]').first().click({ force: true });
                });
            }

            // Validate login success by checking URL or dashboard elements
            cy.url().should('not.include', '/login'); // Ensure that the URL doesn't contain "/login"
            cy.url().should((url) => {
                const isDashboard = url.includes("dashboard");
                const isProfile = url.includes("profile");
                const isUser = url.includes("user");
                expect(isDashboard || isProfile || isUser, "URL should include profile/dashboard in the URL").to.be.true;
            });
        });

        // Capture the result of each test
        afterEach(function () {
            // The 'site' variable is still properly scoped due to 'for-of' loop
            const testStatus = this.currentTest.state === 'failed' ? 'failed' : 'success';
            
            let result = {
                testName: 'Daily Demo User Login Test',
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
    })

    // After all tests, write to a JSON file
    after(() => {
        cy.writeFile('cypress/CustomReport/Json/UserDemoTestResults.json', results);
    });
};

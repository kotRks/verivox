// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add(
    'waitUntilVisible',
    {
        prevSubject: 'element',
    },
    subject => cy.wrap(subject).should('not.visible'),
);

Cypress.Commands.add(
    'waitUntilNotExist',
    {
        prevSubject: 'element',
    },
    subject => cy.wrap(subject).should('not.exist'),
);
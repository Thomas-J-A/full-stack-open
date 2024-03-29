// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, {
    username,
    name,
    password,
  });
});

Cypress.Commands.add('logIn', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
    username,
    password,
  }).then((res) => {
    localStorage.setItem('currentUserAndToken', JSON.stringify(res.body));

    // Reload page so that useEffect runs and updates local state
    cy.visit('/');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/api/blogs`,
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('currentUserAndToken')).token
      }`,
    },
  });

  // Reload page to update UI
  cy.visit('/');
});

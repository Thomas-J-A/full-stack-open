/* eslint-disable func-names, prefer-arrow-callback */
describe('Bloglist app', function () {
  beforeEach(function () {
    // Reset all data in db
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`);

    // Seed a user in db
    cy
      .fixture('user').as('user').then((user) => {
        cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user);
      });

    // Visit route page
    cy.visit('/');
  });

  it('displays login form on load', function () {
    cy.findByRole('heading', { name: /log in to app/i }).should('be.visible');
    cy.findByLabelText(/username/i).should('be.visible');
    cy.findByLabelText(/password/i).should('be.visible');
    cy.findByRole('button', { name: /log in/i }).should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.findByLabelText(/username/i).type(this.user.username);
      cy.findByLabelText(/password/i).type(this.user.password);
      cy.findByRole('button', { name: /log in/i }).click();

      cy.findByText(/logged in as/i).should('be.visible');
    });

    it('fails with incorrect credentials', function () {
      cy.findByLabelText(/username/i).type(this.user.username);
      cy.findByLabelText(/password/i).type('incorrect password');
      cy.findByRole('button', { name: /log in/i }).click();

      cy.findByText(/wrong credentials/i).as('error');
      cy
        .get('@error')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});

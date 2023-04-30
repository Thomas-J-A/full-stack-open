/* eslint-disable func-names, prefer-arrow-callback */

describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`);
    cy.visit('/');
  });

  it('displays login form on load', function () {
    cy.findByRole('heading', { name: /log in to app/i }).should('exist');
    cy.findByLabelText(/username/i).should('exist');
    cy.findByLabelText(/password/i).should('exist');
    cy.findByRole('button', { name: /log in/i }).should('exist');
  });
});

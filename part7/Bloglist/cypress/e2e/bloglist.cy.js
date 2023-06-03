/* eslint-disable func-names, prefer-arrow-callback */
describe('Bloglist app', function () {
  beforeEach(function () {
    // Reset all data in db
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`);

    // Seed a user in db
    cy.fixture('users')
      .as('users')
      .then((users) => {
        cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, users[0]);
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
      cy.findByLabelText(/username/i).type(this.users[0].username);
      cy.findByLabelText(/password/i).type(this.users[0].password);
      cy.findByRole('button', { name: /log in/i }).click();

      cy.findByText(/logged in as/i).should('be.visible');
    });

    it('fails with incorrect credentials', function () {
      cy.findByLabelText(/username/i).type(this.users[0].username);
      cy.findByLabelText(/password/i).type('incorrect password');
      cy.findByRole('button', { name: /log in/i }).click();

      cy.findByText(/wrong credentials/i).as('error');
      cy.get('@error')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.logIn({
        username: this.users[0].username,
        password: this.users[0].password,
      });
      cy.fixture('blogs').as('blogs');
    });

    it('should create a new blog', function () {
      cy.findByRole('button', { name: /create new blog/i }).click();
      cy.findByLabelText(/title/i).type(this.blogs[0].title);
      cy.findByLabelText(/author/i).type(this.blogs[0].author);
      cy.findByLabelText(/url/i).type(this.blogs[0].url);
      cy.findByRole('button', { name: /create/i }).click();

      cy.findByText(/blog added/i).should('be.visible');
      cy.get('.blog')
        .findByText(/meditations/i)
        .should('exist');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: this.blogs[0].title,
          author: this.blogs[0].author,
          url: this.blogs[0].url,
        });
      });

      it('should like a blog', function () {
        cy.get('.blog').as('blog entry');

        cy.get('@blog entry').findByRole('button', { name: /view/i }).click();

        cy.get('@blog entry').findByText(/likes/i).should('include.text', '0');

        cy.get('@blog entry').findByRole('button', { name: /like/i }).click();

        cy.get('@blog entry').findByText(/likes/i).should('include.text', '1');
      });

      it("should remove user's own blog", function () {
        cy.get('.blog').as('blog entry');

        cy.get('@blog entry').findByRole('button', { name: /view/i }).click();

        cy.get('@blog entry')
          .findByRole('button', { name: /remove/i })
          .click();

        cy.get('@blog entry').should('not.exist');
      });

      it('should only show remove button for creator of blog', function () {
        // Log out creator of blog
        cy.findByRole('button', { name: /logout/i }).click();

        // Create new user and log them in
        cy.createUser({
          username: this.users[1].username,
          name: this.users[1].name,
          password: this.users[1].password,
        });

        cy.logIn({
          username: this.users[1].username,
          password: this.users[1].password,
        });

        cy.get('.blog').as('blog entry');

        cy.get('@blog entry').findByRole('button', { name: /view/i }).click();

        cy.get('@blog entry')
          .findByRole('button', { name: /remove/i })
          .should('not.exist');
      });
    });

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 2; i++) {
          cy.createBlog({
            title: this.blogs[i].title,
            author: this.blogs[i].author,
            url: this.blogs[i].url,
          });
        }
      });

      it('should display blogs in order with most likes first', function () {
        // Second in list
        cy.get('.blog').eq(1).should('contain', this.blogs[1].title);

        // Find and like that entry
        cy.findByText(
          new RegExp(`${this.blogs[1].title} | ${this.blogs[1].author}`, 'i'),
        )
          .findByRole('button', { name: /view/i })
          .click();

        cy.findByText(
          new RegExp(`${this.blogs[1].title} | ${this.blogs[1].author}`, 'i'),
        )
          .parent()
          .findByRole('button', { name: /like/i })
          .click();

        // First in list
        cy.get('.blog').eq(0).should('contain', this.blogs[1].title);
      });
    });
  });
});

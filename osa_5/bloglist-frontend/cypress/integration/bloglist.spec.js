describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')

    const user = {
      name: 'Vili Tulonen',
      username: 'superman',
      password: 'notcryptonite',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.get('form > div').contains('username')
  })

  describe('Login', function () {
    it('logs user in with correct credentials'),
      function () {
        cy.get('#login_username').type('superman')
        cy.get('#login_password').type('notcryptonite')
        cy.get('#login-submit').click()

        cy.contains('Logged in as Vili Tulonen')
      }

    it('wont login with wrong credentials'),
      function () {
        cy.get('#login_username').type('wrongman')
        cy.get('#login_password').type('notcorrect')
        cy.get('#login-submit').click()

        cy.get('#notification')
          .contains('Invalid username or password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      }
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'superman', password: 'notcryptonite' })
    })

    it.only('A blog can be created', function () {
      cy.get('#btn-create-blog').click();
      cy.get('.blog-form__title').type("Test Blog")
      cy.get('.blog-form__author').type("Test Author")
      cy.get('.blog-form__url').type("www.testblogs.com")

      cy.get('form').submit()
      
      cy.get('.blog')
        .contains('Test Blog')
    })

    it.only('and it can be liked', function () {
      cy.createBlog({
        title: "Test Blog",
        author: "Test Author",
        url: "www.testblogs.com",
      })
      cy.get('#btn-toggle-show').click()
      cy.get('#btn-like').click()
      cy.get('.blog__likes').should('contain', "Likes: 1")

    })
  })
})

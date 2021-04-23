import { func } from 'prop-types'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')

    const user = {
      name: 'Vili Tulonen',
      username: 'superman',
      password: 'notcryptonite',
    }
    const user2 = {
      name: 'Other',
      username: 'ouser',
      password: 'ous',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  describe('Login', function () {
    it('Login form is shown', function () {
      cy.contains('Login')
      cy.get('form > div').contains('username')
    })

    it('logs user in with correct credentials', function () {
      cy.get('#login_username').type('superman')
      cy.get('#login_password').type('notcryptonite')
      cy.get('#btn-submit').click()

      cy.contains('Logged in as Vili Tulonen')
    })

    it('wont login with wrong credentials', function () {
      cy.get('#login_username').type('wrongman')
      cy.get('#login_password').type('notcorrect')
      cy.get('#btn-submit').click()

      cy.get('#notification')
        .contains('Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'superman', password: 'notcryptonite' })
    })

    it('A blog can be created', function () {
      cy.get('#btn-create-blog').click()
      cy.get('.blog-form__title').type('Test Blog')
      cy.get('.blog-form__author').type('Test Author')
      cy.get('.blog-form__url').type('www.testblogs.com')
      cy.get('form').submit()
      cy.get('.blog').contains('Test Blog')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'www.testblogs.com',
      })

      cy.get('#btn-toggle-show').click()
      cy.get('#btn-like').click()
      cy.get('.blog__likes').should('contain', 'Likes: 1')
    })

    it('A blog can be deleted', function () {
      cy.createBlog({
        title: 'To delete',
        author: 'Test Author',
        url: 'www.testblogs.com',
      })

      cy.get('.blog').as('blogToDelete') // testing alias
      cy.get('@blogToDelete').contains('To delete')
      cy.get('#btn-toggle-show').click()
      cy.get('#btn-delete').click()
      cy.get('@blogToDelete').should('not.exist')
    })

    it('A blog can not be deleted by other users', function () {
      cy.createBlog({
        title: "Others can't delete",
        author: 'Test Author',
        url: 'www.testblogs.com',
      })

      cy.get('#btn-logout').click() // Log out and log in with other user
      cy.login({ username: 'ouser', password: 'ous' })

      cy.get('#btn-toggle-show').click()
      cy.get('#btn-delete').should('not.exist')
    })

    it('Blogs are displayed in order of most likes', function () {
      cy.createBlog({
        title: 'Blog',
        author: 'Test Author1',
        url: 'www.testblogs.com',
      })
      cy.createBlog({
        title: 'Clog',
        author: 'Test Author2',
        url: 'www.testblogs.com',
      })
      cy.createBlog({
        title: 'Thug',
        author: 'Test Author3',
        url: 'www.testblogs.com',
      })

      cy.likeBlog({ blogTitle: 'Clog', amountOfLikes: 3 })
      cy.likeBlog({ blogTitle: 'Thug', amountOfLikes: 2 })
      cy.likeBlog({ blogTitle: 'Blog', amountOfLikes: 1 })

      // Expect 'Clog' to be displayed first and 'Blog' to be displayed last
      cy.get('.blog:first').should('contain', 'Clog')
      cy.get('.blog:last').should('contain', 'Blog')

      // Like 'Thug' two more times and expect it to be first
      cy.likeBlog({ blogTitle: 'Thug', amountOfLikes: 2 })
      cy.get('.blog:first').should('contain', 'Thug')
    })
  })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
  })
})

describe('Login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.contains('login').click()
    cy.contains('Matti Luukkainen logged in')
  })

  it('fails with wrong credentials', function () {
    cy.get('#username').type('jhdfjksh')
    cy.get('#password').type('aklakala')
    cy.contains('login').click()
    cy.contains('wrong username or password')
  })
})
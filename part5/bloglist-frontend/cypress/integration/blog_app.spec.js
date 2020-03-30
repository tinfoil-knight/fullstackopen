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

describe.only('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.request('POST', 'http://localhost:3003/api/login', user)
      .then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
  })

  it('A blog can be created', function () {
    cy.contains('new note').click()
    cy.get('#title').type('Vue vs React')
    cy.get('#author').type('Henry Shaw')
    cy.get('#url').type('https://www.shawhenry.com/blog/vuevsreact')
    cy.get('#create').click()
    cy.contains('Vue vs React')
    cy.contains('Henry Shaw')
  })

  it('User can like a blog', function () {
    // Creating a Blog (Replace with POST request with a token)
    cy.contains('new note').click()
    cy.get('#title').type('Vue vs React')
    cy.get('#author').type('Henry Shaw')
    cy.get('#url').type('https://www.shawhenry.com/blog/vuevsreact')
    cy.get('#create').click()
    // Liking the blog
    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('1')
  })
})

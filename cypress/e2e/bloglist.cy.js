describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      username: 'cypress',
      name: 'cypress-testaaja',
      password: 'salasana'
    }
    const user2 = {
      username: 'cypress2',
      name: 'cypress-testaaja2',
      password: 'salasana2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')

  })

  it('5.17 Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('5.18 succeeds with correct credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Signed in as cypress-testaaja')
    })

    it('5.18 fails with wrong credentials and red error message is shown', function() {
      cy.get('#username').type('kypress')
      cy.get('#password').type('sanasala')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('#error-notification').should('have.css', 'color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Signed in as cypress-testaaja')
    })

    it('5.19 A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('this is the title')
      cy.get('#author').type('this is the author')
      cy.get('#url').type('this is the url')
      cy.get('#create-button').click()
      cy.contains('a new blog this is the title by this is the author added')
      cy.contains('Title:')
      cy.contains('this is the title')
      cy.contains('Author:')
      cy.contains('this is the author')
    })

    it('5.20 A blog can be liked', function () {
      cy.contains('create a new blog').click()
      cy.get('#title').type('this is the title')
      cy.get('#author').type('this is the author')
      cy.get('#url').type('this is the url')
      cy.get('#create-button').click()
      cy.contains('a new blog this is the title by this is the author added')
      cy.contains('view').click()
      cy.get('#likes').contains('0')
      cy.contains('like').click()
      cy.get('#likes').contains('1')
    })

    it('5.21 A blog can be deleted', function () {
      // Creating a Blog
      cy.contains('create a new blog').click()
      cy.get('#title').type('this is the title')
      cy.get('#author').type('this is the author')
      cy.get('#url').type('this is the url')
      cy.get('#create-button').click()

      // Making sure the Blog is created:
      cy.contains('a new blog this is the title by this is the author added')
      cy.contains('Title:')
      cy.contains('this is the title')
      cy.contains('Author:')
      cy.contains('this is the author')

      // Removing the Blog
      cy.contains('remove').click()
      cy.get('#singleBlog').should('not.exist')
    })

    it('5.21 A blog can be deleted only by the person created it', function () {
      // Creating a Blog
      cy.contains('create a new blog').click()
      cy.get('#title').type('this is the title')
      cy.get('#author').type('this is the author')
      cy.get('#url').type('this is the url')
      cy.get('#create-button').click()

      // Making sure the Blog is created:
      cy.contains('a new blog this is the title by this is the author added')
      cy.contains('Title:')
      cy.contains('this is the title')
      cy.contains('Author:')
      cy.contains('this is the author')

      // Log out
      cy.contains('log out').click()

      // Log in as another user
      cy.get('#username').type('cypress2')
      cy.get('#password').type('salasana2')
      cy.get('#login-button').click()
      cy.contains('Signed in as cypress-testaaja2')

      // Trying to fing the remove button
      cy.get('#remove-button').should('not.exist')
    })

    it('5.22 The blogs are in descending order by likes', function () {
      // Adding three blogs
      cy.contains('create a new blog').click()
      cy.get('#title').type('second-most-liked title')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.get('#create-button').click()

      cy.contains('create a new blog').click()
      cy.get('#title').type('third-most-liked title')
      cy.get('#author').type('author2')
      cy.get('#url').type('url2')
      cy.get('#create-button').click()

      cy.contains('create a new blog').click()
      cy.get('#title').type('most-liked title')
      cy.get('#author').type('author3')
      cy.get('#url').type('url3')
      cy.get('#create-button').click()

      // This part needs a bit thinking through, but
      // the first blog is liked twice
      // the second blog is liked once
      // the thrid blog is liked three times

      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()

      cy.get('#likes').contains('like').click()
      cy.get('#likes').contains(1)
      cy.get('#likes').contains('like').click()
      cy.get('#likes').contains(2)

      cy.contains('hide').click()

      cy.get('#likes').contains('like').click()
      cy.get('#likes').contains(1)

      cy.contains('hide').click()

      cy.get('#likes').contains('like').click()
      cy.get('#likes').contains(1)
      cy.get('#likes').contains('like').click()
      cy.get('#likes').contains(2)
      cy.get('#likes').contains('like').click()
      cy.get('#likes').contains(3)

      cy.contains('hide').click()

      // refreshing the site
      cy.visit('http://localhost:3000')

      // Checking whether the blogs are in descending order by likes

      // Let's view the blogs
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()

      // Let's assume that blogs are in descending order by likes
      cy.get('.blog').eq(0).should('contain', 'most-liked title')
      cy.get('.blog').eq(1).should('contain', 'second-most-liked title')
      cy.get('.blog').eq(2).should('contain', 'third-most-liked title')
    })
  })
})
describe('Blog ', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
        
    it('Login page can be opened', function () {
        cy.contains('Login')
    })

    it('User can login', function () {
        cy.get('#username').type('cypress')
        cy.get('#password').type('salasana')
        cy.get('#login-button').click()

        cy.contains('Signed in as cypress testaaja')

    }) 
})

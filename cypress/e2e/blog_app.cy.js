describe('Blog app', ()=>{

  beforeEach(()=>{
    cy.env(['BACKEND']).then(({BACKEND})=>{
      cy.request('POST', `${BACKEND}/testing/clean`)

      const user = {
        name: 'Thomas Jonsonn',
        username: 'root',
        password: 'salainen'
      }
      cy.request('POST', `${BACKEND}/users`, user)

    })
   cy.visit('')
  })

  it('Login form is shown', ()=>{
    cy.contains('Login in to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.get('button')
        .contains('Login')
  })

  describe('Login', ()=>{
    it('succeeds with correct credentials', ()=>{

      const username = 'root'
      const password = 'salainen'

      cy.get('#input-username').type(`${username}`)
      cy.get('#input-password').type(`${password}`)
      cy.get('#login-button').click()

      cy.contains(`${username} logged in`)
    })

    it('fails with wrong credentials', ()=>{
      const username = 'root'
      const password = 'wrong'

      cy.get('#input-username').type(`${username}`)
      cy.get('#input-password').type(`${password}`)
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

})
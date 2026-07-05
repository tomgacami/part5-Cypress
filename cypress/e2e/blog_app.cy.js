// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('http://example.cypress.io')
//   })
// })

describe('Blog app', ()=>{

  beforeEach(()=>{

    cy.visit('http://localhost:5173')
    // cy.visit('')
  })

  it('Login form is shown', ()=>{
    cy.contains('Login in to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.get('button')
        .contains('Login')
  })
})
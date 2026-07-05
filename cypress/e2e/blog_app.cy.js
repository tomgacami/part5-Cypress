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

  describe('When logged in', ()=>{
    beforeEach(()=>{
      cy.login({username: 'root', password: 'salainen'})
    })

    it('A blog can be created', ()=>{
      cy.get('button')
          .contains('Create new blog')
          .click()
      cy.get('#title-blog-input').type('First blog title created')
      cy.get('#author-blog-input').type('First blog author created')
      cy.get('#url-blog-input').type('First blog url created')

      cy.get('form')
          .contains('Create')
          .click()

      cy.wait(6000)
      cy.contains('First blog title created')
      cy.contains('First blog author created')
    })

    it.only('a user can give a like on one blog', ()=>{

      cy.createBlog({title: 'First blog title created', author: 'First blog author created', url:'First blog url created'})

      cy.get('button')
          .contains('view')
          .click()
      cy.get('button')
          .contains('like')
          .click()

      cy.get('.additional-info-blog')
          .contains('Likes 1')

    })

  })

})
describe('Blogilistan testit', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Terttu Testaaja',
      username: 'testeri',
      password: 'sekret'
    }
    const user2 = {
      name: 'Topi Testaaja',
      username: 'toinen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('')
  })

  it('Kirjautumissivu näytetään', function () {
    cy.contains('Kirjaudu sisään:')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Kirjautumisen testit', function () {
    it('Kirjautuminen epäonnistuu väärällä käyttäjänimellä', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.get('.errorMessage').contains('Virheellinen käyttäjätunnus tai salasana')
    })

    it('Kirjautuminen epäonnistuu väärällä salasanalla', function () {
      cy.get('#username').type('testeri')
      cy.get('#password').type('sikret')
      cy.get('#login-button').click()
      cy.get('.errorMessage').contains('Virheellinen käyttäjätunnus tai salasana')
    })

    it('Kirjautuminen oikeilla tiedoilla onnistuu', function () {
      cy.get('#username').type('testeri')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('Terttu Testaaja kirjautunut')
    })
  })

  describe('Kirjautumisen jälkeen...', function () {
    beforeEach(function () {
      cy.login({ username: 'testeri', password: 'sekret' })
    })

    it('Uuden blogin tekeminen onnistuu', function () {
      cy.contains('Lisää uusi blogi').click()
      cy.get('#title').type('Testiblogi')
      cy.get('#author').type('Rampe')
      cy.get('#url').type('rampe.fi')
      cy.get('#add-button').click()
    })

    describe('Blogin lisäämisen jälkeen...', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testiblogi',
          author: 'Rampe',
          url: 'rampe.fi'
        })
        cy.createBlog({
          title: 'Toinen',
          author: 'Pete',
          url: 'pete.fi'
        })
      })

      it('Blogia voi likettää', function () {
        cy.contains('Testiblogi').get('#expand').click()
        cy.contains('Testiblogi').get('#like').click()
      })

      it('Blogin lisännyt käyttäjä voi poistaa blogin', function () {
        cy.contains('Testiblogi').get('#expand').click()
        cy.contains('Testiblogi').get('#delete').click()
        cy.get('html').should('not.contain', 'Testiblogi')
      })

      it('Delete nappi ei näy väärälle käyttäjälle', function () {
        cy.contains('Kirjaudu ulos').click()
        cy.login({ username: 'toinen', password: 'salainen' })

        cy.contains('Testiblogi').get('#expand').click()
        cy.contains('Testiblogi').should('not.contain', '#delete')
      })

      it.only('Eniten likejä saanut blogi listan ensimmäisenä', function () {
        cy.get('.blog').eq(0).should('contain', 'Testiblogi')
        cy.contains('Toinen').find('#expand').click()
        cy.contains('Toinen').find('#like').click()
        cy.get('.blog').eq(0).should('contain', 'Toinen')

        cy.contains('Testiblogi').find('#expand').click()
        cy.contains('Testiblogi').find('#like').click()
        cy.contains('Testiblogi').find('#like').click()

        cy.get('.blog').eq(0).should('contain', 'Testiblogi')
      })
    })
  })
})
describe('Etusivu aukeaa', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Kirjautumissivu näytetään', function () {
    cy.contains('Kirjaudu sisään:')
    cy.get('#username')
    cy.get('#password')
  })
})
describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Angular Starter')
  })

  it('should operations', () => {
    cy.get('app-operations > div > mat-list', { timeout: 10000 }).should('be.visible')
  })
})

import { goto } from '../helpers';

describe('Search spec', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    goto('http://localhost:3000/');
  });

  it('Should show not found text if searched thread is not found', () => {
    cy.get('[data-cy=btn-search-text]').parent().click();
    cy.get('input[type=text]').type(`abcdefghijklmnopqrstuvwxyz${+new Date()}`);
    cy.get('p').contains('No Result found').should('be.visible');
  });

  it('Should show related thread if searched thread is found', () => {
    cy.get('[data-cy=btn-search-text]').parent().click();
    cy.get('input[type=text]').type('introduction');
    cy.get('h3').contains('Halo! Selamat datang').should('be.visible');
    cy.get('span').contains('Dicoding').should('be.visible').click();

    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
  });
});

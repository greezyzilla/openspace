import { goto, login } from '../helpers';

describe('template spec', () => {
  beforeEach(() => cy.viewport('macbook-15'));

  it('Should show page not found if visiting random page', () => {
    goto('http://localhost:3000/random');

    cy.get('p').contains('The Page that you looking for is not found').should('be.visible');
    cy.get('a').contains('Back to Home').should('be.visible').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Should show thread not found if visiting random thread', () => {
    goto('http://localhost:3000/details/thread-random');

    cy.get('p').contains('The thread that you looking for is not found').should('be.visible');
    cy.get('a').contains('Back to Home').should('be.visible').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Should navigating to detail if title or comment count clicked', () => {
    goto('http://localhost:3000/');

    cy.get('article[data-cy=thread-B3N9KGa87vfMHyBQ] a').first().click();

    cy.url().should('eq', 'http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
    goto('http://localhost:3000/');

    cy.get('article[data-cy=thread-B3N9KGa87vfMHyBQ] a').contains('Comment').click();
    cy.url().should('eq', 'http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
  });

  it('Should show filtered threads by category if visiting thread category', () => {
    goto('http://localhost:3000/categories/introduction');

    cy.get('a').contains('Halo! Selamat datang').should('exist');
    cy.get('a').contains('Pengalaman Belajar React di Dicoding').should('not.exist');
  });

  it('Should navigating to login page using header user navigation', () => {
    goto('http://localhost:3000/');
    cy.get('[data-cy=user-nav] a').click();

    cy.url().should('eq', 'http://localhost:3000/auth/login');
  });

  it('Should navigating to home and leaderboards using header user navigation', () => {
    login();

    cy.get('div.Toastify').children().click();
    cy.get('[data-cy=user-nav] button').click();
    cy.get('[data-cy=user-nav] a').contains('Leaderboard').should('be.visible').click();

    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/leaderboard');
    cy.get('[data-cy=user-nav] button').click();
    cy.get('[data-cy=user-nav] a').contains('Home').should('be.visible').click();

    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Should navigating to home and leaderboards using left sidebar navigation', () => {
    login();
    cy.get('[data-cy=left-sidebar] a').contains('Leaderboard').should('be.visible').click();

    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/leaderboard');
    cy.get('[data-cy=left-sidebar] a').contains('Home').should('be.visible').click();

    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

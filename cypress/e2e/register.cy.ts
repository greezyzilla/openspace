import { goto } from '../helpers';

describe('Register spec', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    goto('http://localhost:3000/auth/register');
  });

  it('Should display register page correctly', () => {
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="passwordConfirmation"]').should('be.visible');

    cy.get('button').contains('Register').should('be.visible');
    cy.get('a').contains('Login here').should('be.visible');
  });

  it('Should show error required if submitting input empty', () => {
    cy.get('button').contains('Register').click();
    cy.get('input:invalid').should('have.length', 4);
  });

  it('Should show danger if password does not match, and fire toast if submitted', () => {
    cy.get('input[name="name"]').type('GreezyZilla Test');
    cy.get('input[name="email"]').type(`greezyzilla${+new Date()}@test.com`);
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="passwordConfirmation"]').type('456');
    cy.get('input[name="passwordConfirmation"]').should('have.class', 'ring-red-200');
    cy.get('button').contains('Register').click();

    cy.wait(2000);
    cy.get('div').contains('Password doesn\'t match').should('be.visible');
  });

  it('Should fire toast if submitting form but password too short', () => {
    cy.get('input[name="name"]').type('GreezyZilla Test');
    cy.get('input[name="email"]').type(`greezyzilla${+new Date()}@test.com`);
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="passwordConfirmation"]').type('123');
    cy.get('button').contains('Register').click();

    cy.wait(2000);
    cy.get('div').contains('Password Must Be At Least 6 Characters Long').should('be.visible');
  });

  it('Should register successfully when given valid inputs', () => {
    cy.get('input[name="name"]').type('GreezyZilla Test');
    cy.get('input[name="email"]').type(`greezyzilla${+new Date()}@test.com`);
    cy.get('input[name="password"]').type('terserah');
    cy.get('input[name="passwordConfirmation"]').type('terserah');
    cy.get('button').contains('Register').click();

    cy.wait(2000);
    cy.get('div').contains('Register success').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/auth/login');
  });
});

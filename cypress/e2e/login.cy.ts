import { goto, login } from '../helpers';

describe('Login spec', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    goto('http://localhost:3000/auth/login');
  });

  it('Should display login page correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
    cy.get('a').contains('Register here').should('be.visible');
  });

  it('Should show error required if submitting input empty', () => {
    cy.get('button').contains('Login').click();
    cy.get('input:invalid').should('have.length', 2);
  });

  it('Should fire toast if email and password does not match any record', () => {
    cy.get('input[name="email"]').type('greezyzilla@test.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button').contains('Login').click();
    cy.wait(2000);
    cy.get('div').contains('Email Or Password Is Wrong').should('be.visible');
  });

  it('Should login successfully when given valid inputs', () => {
    cy.get('input[name="email"]').type('greezyzilla@test.com');
    cy.get('input[name="password"]').type('terserah');
    cy.get('button').contains('Login').click();
    cy.wait(2000);
    cy.get('div').contains('Login success').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Should deny authenticated user from accessing login or register page', () => {
    login();
    cy.get('div').contains('Login success').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/');

    goto('http://localhost:3000/auth/login');
    cy.url().should('eq', 'http://localhost:3000/');

    goto('http://localhost:3000/auth/register');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

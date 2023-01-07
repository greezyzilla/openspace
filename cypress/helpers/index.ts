export const login = () => {
  cy.visit('http://localhost:3000/auth/login');
  cy.get('input[name="email"]').type('greezyzilla@test.com');
  cy.get('input[name="password"]').type('terserah');
  cy.get('button').contains('Login').click();
  cy.wait(2000);
};

export const goto = (url: string) => {
  cy.visit({ url, failOnStatusCode: false });
  cy.wait(2000);
};

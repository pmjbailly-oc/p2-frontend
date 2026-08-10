// Commandes Cypress personnalisées.
Cypress.Commands.add('login', (login: string, password: string) => {
  cy.visit('/login');
  cy.get('input[formControlName="login"]').type(login);
  cy.get('input[formControlName="password"]').type(password);
  cy.get('button.btn-primary').click();
});

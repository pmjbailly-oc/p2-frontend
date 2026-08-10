declare namespace Cypress {
  interface Chainable {
    login(login: string, password: string): void;
  }
}

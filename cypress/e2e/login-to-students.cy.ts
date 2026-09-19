describe('Login', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { token: 'fake-token' }
    }).as('loginRequest');
  });

  it('stores the token and redirects to /students on success', () => {
    // WHEN - soumission du formulaire de connexion
    cy.visit('/login');
    cy.get('input[formControlName="login"]').type('pmj.bailly');
    cy.get('input[formControlName="password"]').type('pmjbailly13122');
    cy.get('button.btn-primary').click();

    // THEN - l'API est appelée et le token stocké
    cy.wait('@loginRequest');
    cy.window().its('sessionStorage.token').should('eq', 'fake-token');

    // THEN - redirection vers /students (la liste est mockée à son tour)
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: []
    });
    cy.url().should('include', '/students');
  });

  it('shows an error message on failure', () => {
    // GIVEN - l'API répond 401
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    });

    // WHEN
    cy.visit('/login');
    cy.get('input[formControlName="login"]').type('bad');
    cy.get('input[formControlName="password"]').type('wrong');
    cy.get('button.btn-primary').click();

    // THEN - message d'erreur affiché, pas de redirection
    cy.get('.alert-danger').should('contain', 'Invalid credentials');
    cy.url().should('include', '/login');
  });
});

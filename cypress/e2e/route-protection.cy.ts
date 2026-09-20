describe('Route protection', () => {
  it('redirects to /login when accessing /students without token', () => {
    // GIVEN - pas de token stocké
    localStorage.clear();

    // WHEN - accès direct à une route protégée
    cy.visit('/students');

    // THEN - redirection vers le login
    cy.url().should('include', '/login');
  });

  it('redirects to /login when accessing /students/add without token', () => {
    // GIVEN
    localStorage.clear();

    // WHEN
    cy.visit('/students/add');

    // THEN
    cy.url().should('include', '/login');
  });

  it('allows access when a token is present', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: []
    });

    // WHEN
    cy.visit('/students');

    // THEN - pas de redirection, on reste sur la liste
    cy.url().should('include', '/students');
  });
});

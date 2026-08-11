describe('Students list', () => {
  beforeEach(() => {
    // Token factice pour passer le guard
    sessionStorage.setItem('token', 'fake-token');
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: [
        {
          id: 1,
          firstName: 'Marie',
          lastName: 'Durand',
          email: 'marie.durand@example.com',
          createdAt: '2026-07-31T16:49:28',
          updatedAt: '2026-07-31T16:49:28'
        },
        {
          id: 2,
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@example.com',
          createdAt: '2026-07-31T16:50:00',
          updatedAt: '2026-07-31T16:50:00'
        }
      ]
    }).as('getStudents');
  });

  it('displays the students in a table', () => {
    // WHEN
    cy.visit('/students');

    // THEN - l'API est appelée et le tableau rempli
    cy.wait('@getStudents');
    cy.get('tbody tr').should('have.length', 2);
    cy.get('tbody tr').first().should('contain', 'Marie');
    cy.get('tbody tr').first().should('contain', 'marie.durand@example.com');
  });

  it('has an Add Student button', () => {
    // WHEN
    cy.visit('/students');
    cy.wait('@getStudents');

    // THEN
    cy.get('a.btn-primary').should('contain', 'Add Student');
  });

  it('deletes a student and reloads the list', () => {
    // GIVEN - la suppression répond 204
    cy.intercept('DELETE', '/api/students/1', {
      statusCode: 204,
      body: null
    }).as('deleteStudent');

    // WHEN - chargement initial de la liste (intercept du beforeEach)
    cy.visit('/students');
    cy.wait('@getStudents');

    // THEN - l'intercept de rechargement est enregistré après le chargement initial
    //        pour ne pas masquer celui du beforeEach
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: [
        {
          id: 2,
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@example.com',
          createdAt: '2026-07-31T16:50:00',
          updatedAt: '2026-07-31T16:50:00'
        }
      ]
    }).as('getStudentsAfterDelete');

    // WHEN - suppression du premier étudiant
    cy.get('tbody tr').first().contains('Delete').click();

    // THEN - DELETE appelé puis liste rechargée avec un seul étudiant
    cy.wait('@deleteStudent');
    cy.wait('@getStudentsAfterDelete');
    cy.get('tbody tr').should('have.length', 1);
    cy.get('tbody tr').should('contain', 'Jean');
  });
});

describe('Student CRUD screens', () => {
  const student = {
    id: 1,
    firstName: 'Marie',
    lastName: 'Durand',
    email: 'marie.durand@example.com',
    createdAt: '2026-07-31T16:49:28',
    updatedAt: '2026-07-31T16:49:28'
  };

  beforeEach(() => {
    sessionStorage.setItem('token', 'fake-token');
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: [student]
    }).as('getStudents');
  });

  it('creates a new student via the form', () => {
    // GIVEN - la création répond 201 puis la liste mise à jour
    cy.intercept('POST', '/api/students', {
      statusCode: 201,
      body: { ...student, id: 3, firstName: 'Claire', email: 'claire.petit@example.com' }
    }).as('createStudent');

    // WHEN - remplissage du formulaire d'ajout
    cy.visit('/students/add');
    cy.get('input[formControlName="firstName"]').type('Claire');
    cy.get('input[formControlName="lastName"]').type('Petit');
    cy.get('input[formControlName="email"]').type('claire.petit@example.com');
    cy.get('button.btn-primary').click();

    // THEN - l'API de création est appelée puis retour sur la liste
    cy.wait('@createStudent');
    cy.url().should('include', '/students');
  });

  it('shows validation errors for an empty form', () => {
    // WHEN - soumission du formulaire vide
    cy.visit('/students/add');
    cy.get('button.btn-primary').click();

    // THEN - messages de validation affichés
    cy.get('.invalid-feedback').should('contain', 'First Name is required');
    cy.get('.invalid-feedback').should('contain', 'Last Name is required');
    cy.get('.invalid-feedback').should('contain', 'Email is required');
  });

  it('displays the detail of a student', () => {
    // GIVEN
    cy.intercept('GET', '/api/students/1', {
      statusCode: 200,
      body: student
    }).as('getStudent');

    // WHEN
    cy.visit('/students/1');

    // THEN
    cy.wait('@getStudent');
    cy.get('table').should('contain', 'Marie');
    cy.get('table').should('contain', 'marie.durand@example.com');
    cy.get('a.btn-warning').should('contain', 'Edit');
    cy.get('a.btn-secondary').should('contain', 'Back');
  });

  it('updates a student via the edit form', () => {
    // GIVEN - le formulaire pré-rempli et la modification répond 200
    cy.intercept('GET', '/api/students/1', {
      statusCode: 200,
      body: student
    }).as('getStudent');
    cy.intercept('PUT', '/api/students/1', {
      statusCode: 200,
      body: { ...student, firstName: 'Marie-Anne' }
    }).as('updateStudent');

    // WHEN
    cy.visit('/students/1/edit');
    cy.wait('@getStudent');

    // THEN - le formulaire est pré-rempli
    cy.get('input[formControlName="firstName"]').should('have.value', 'Marie');

    // WHEN - modification puis sauvegarde
    cy.get('input[formControlName="firstName"]').clear().type('Marie-Anne');
    cy.get('button.btn-primary').click();

    // THEN - l'API de modification est appelée puis retour sur la liste
    cy.wait('@updateStudent');
    cy.url().should('include', '/students');
  });
});

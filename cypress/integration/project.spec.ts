describe('Project page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should add a project', () => {
    const projectName = 'Side Project';
    const projectUrl = projectName.toLowerCase().trim().split(/\s+/).join('-');
    const invalidProjectName = 'MoreThanTwentyCharacters!!';
    cy.get('[data-cy=addProject]')
      .click()
      .get('[data-cy=addProject-cancel]')
      .click()
      .get('#mat-dialog-1')
      .should('not.exist')
      .get('[data-cy=addProject]')
      .click()
      .get('[data-cy=addProject-submit]')
      .should('be.disabled')
      .get('[data-cy=projectName-input]')
      .type(invalidProjectName)
      .get('[data-cy=addProject-submit]')
      .should('be.disabled')
      .get('[data-cy=projectName-input]')
      .clear()
      .type(projectName)
      .get('[data-cy=addProject-submit]')
      .click()
      .url()
      .should('eq', `http://localhost:4200/${projectUrl}/checklist/architecture`)
      .visit('/')
      .get('[data-cy=projectName-title]')
      .contains(projectName);
  });
});


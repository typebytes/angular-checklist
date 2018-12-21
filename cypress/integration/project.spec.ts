describe('Project page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should add a project', () => {
    const projectName = 'Side Project';
    const projectUrl = projectName.toLowerCase().trim().split(/\s+/).join('-');
    cy.get('.add-project-card')
      .click()
      .get('#mat-input-0')
      .type(projectName)
      .get('.mat-raised-button')
      .click()
      .url()
      .should('eq', `http://localhost:4200/${projectUrl}/checklist/architecture`)
      .visit('/')
      .get('.project-name')
      .contains(projectName);
  });
  it('should close the dialog on cancel', () => {
    cy.get('.add-project-card')
      .click()
      .get('.mat-button')
      .click()
      .get('#mat-dialog-1')
      .should('not.exist');
  });
  it('should disable the project creation on empty project name', () => {
    cy.get('.add-project-card')
      .click()
      .get('.mat-raised-button')
      .should('be.disabled');
  });
  it('should disable the project creation if project name is too long ', () => {
    const invalidProjectName = 'MoreThanTwentyCharacters!!';
    cy.get('.add-project-card')
      .click()
      .get('#mat-input-0')
      .type(invalidProjectName)
      .get('.mat-raised-button')
      .should('be.disabled');
  });
});

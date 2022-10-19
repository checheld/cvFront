/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(login: string, password: string): void
  }
}

describe('levicv tests', () => {

  beforeEach(() => {
    cy.login(
      Cypress.env("LOGIN"),
      Cypress.env("PASSWORD")
    );
  });

  it('navbar navigation', () => {
    cy.visit('/')
    cy.get('span').contains('Project type').click()
    cy.visit('/ProjectType')
    cy.get('span').contains('Work Experience').click()
    cy.visit('/WorkExperience')
    cy.get('span').contains('Technologies').click()
    cy.visit('/Technologies')
    cy.get('span').contains('Education').click()
    cy.visit('/Education')
    cy.get('span').contains('Projects').click()
    cy.visit('/Projects')
    cy.get('span').contains('Users').click()
    cy.visit('/Users')
    cy.get('span').contains('CVs').click()
    cy.visit('/CVs')
  })

  it('project type page test', () => {

    cy.visit('/ProjectType')

    cy.get('button').contains('+ Add Project type').click()
    cy.get("input[placeholder='Project type name']").type('testProjType 1')
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get("input[placeholder='Project type name']:last").type('testProjType 2')
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get('button').contains('Save Project type').click()
    cy.contains('testProjType 1')
    cy.contains('testProjType 2')

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('testProjType 2').should('not.exist')

    cy.contains('testProjType 1').click()
    cy.get("input[placeholder='Item']").clear().type('changedText')
    cy.get('button').contains('Save Project type').click()
    cy.contains('changedText')

    cy.get("input[placeholder='Search project type']").type('changedtext').type('{enter}')
    cy.get('tr').should('have.length', 2)

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('changedText').should('not.exist')

    cy.get("input[placeholder='Search project type']").clear().type('{enter}')
  })

  it('work experience page test', () => {

    cy.visit('/WorkExperience')

    cy.get('button').contains('+ Add Company').click()
    cy.get("input[placeholder='Company name']").type('testCompany 1')
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get("input[placeholder='Company name']:last").type('testCompany 2')
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get('button').contains('Save Company').click()
    cy.contains('testCompany 1')
    cy.contains('testCompany 2')

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('testCompany 2').should('not.exist')

    cy.contains('testCompany 1').click()
    cy.get("input[placeholder='Item']").clear().type('changedText')
    cy.get('button').contains('Save Company').click()
    cy.contains('changedText')

    cy.get("input").type('changedtext').type('{enter}')
    cy.get('tr').should('have.length', 2)

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('changedText').should('not.exist')

    cy.get("input").clear().type('{enter}')
  })

  it('technologies page test', () => {

    cy.visit('/Technologies')

    cy.get('button').contains('+ Add Technology').click()
    cy.get("input[placeholder='Technology name']").type('testTech 1')
    cy.get('#select0').click({ force: true })
    cy.get(`[data-cy = "Front-end"]`).click({ force: true });

    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get("input[placeholder='Technology name']:last").type('testTech 2')
    cy.get('#select1').click({ force: true })
    cy.get(`[data-cy = "Back-end"]`).click({ force: true });
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get('button').contains('Save Technology').click()
    cy.contains('testTech 1').parent().parent().parent().get('p').contains('Front-end')
    cy.contains('testTech 2').parent().parent().parent().get('p').contains('Back-end')

    cy.contains('testTech 2').parent().find('svg').click()
    cy.get('button').contains('Delete').click()
    cy.contains('testTech 2').should('not.exist')

    cy.contains('testTech 1').click()
    cy.get("input[placeholder='Technology name']").clear().type('changedText')
    cy.get('#select0').click({ force: true })
    cy.get(`[data-cy = "Other"]`).click({ force: true });
    cy.get('button').contains('Save Technology').click()
    cy.contains('changedText')

    cy.get("input").type('changedtext').type('{enter}')
    cy.contains('changedText').should('have.length', 1)
    cy.contains('changedText').parent().parent().parent().get('p').contains('Other')
    cy.wait(1000)

    cy.get('span').contains('changedText').parent().find('svg').click()
    cy.get('button').contains('Delete').click()
    cy.contains('changedText').should('not.exist')

    cy.get("input").clear().type('{enter}')
  })

  it('education page test', () => {

    cy.visit('/Education')

    cy.get('button').contains('+ Add University').click()
    cy.get("input[placeholder='University name']").type('testUni 1')
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get("input[placeholder='University name']:last").type('testUni 2')
    cy.get('button[class*="MuiButton-outlined"]').click()
    cy.get('button').contains('Save University').click()
    cy.contains('testUni 1')
    cy.contains('testUni 2')

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('testUni 2').should('not.exist')

    cy.contains('testUni 1').click()
    cy.get("input[placeholder='Item']").clear().type('changedText')
    cy.get('button').contains('Save University').click()
    cy.contains('changedText')

    cy.get("input").type('changedtext').type('{enter}')
    cy.get('tr').should('have.length', 2)

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('changedText').should('not.exist')

    cy.get("input").clear().type('{enter}')
  })

  it('project page test', () => {

    cy.visit('/Projects')
    cy.wait(1000)

    cy.get('button').contains('+ Add Project').click()

    cy.get("input[placeholder='Project name']").type('testProj 1')

    cy.get('#typeSelect').click({ force: true })
    cy.get(`[data-cy = "CRM"]`).click({ force: true });

    cy.get("input[placeholder='Country']").type('testProj 1')
    cy.get("input[placeholder='Link']").type('testProj 1')

    cy.get('#techSelect').click({ force: true })
    cy.get(`[data-cy = "CSS"]`).click({ force: true })
    cy.get(`[data-cy = "C#"]`).click({ force: true })
    cy.get(`[data-cy = "Jest"]`).click({ force: true }).type('{esc}')

    cy.get("input[placeholder='Description']").type('testProj 1')

    cy.get('[data-cy = "Add Project"]').click()

    cy.contains('testProj 1').click()
    cy.get('button').contains('Edit').click()

    cy.get("input[placeholder='Project name']").clear().type('ProjChanged')

    cy.get('#typeSelect').click({ force: true })
    cy.get(`[data-cy = "Application"]`).click({ force: true });

    cy.get("input[placeholder='Country']").clear().type('ProjChanged')
    cy.get("input[placeholder='Link']").clear().type('ProjChanged')

    cy.get('#techSelect').click({ force: true })
    cy.get(`[data-cy = "cucumber"]`).click({ force: true })
    cy.get(`[data-cy = "PostgreSQL"]`).click({ force: true })
    cy.get(`[data-cy = "Type Script"]`).click({ force: true })
    cy.get(`[data-cy = "CSS"]`).click({ force: true })
    cy.get(`[data-cy = "C#"]`).click({ force: true })
    cy.get(`[data-cy = "Jest"]`).click({ force: true }).type('{esc}')

    cy.get("input[placeholder='Description']").clear().type('ProjChanged')

    cy.get('[data-cy = "Save Project"]').click()
    cy.wait(2000)
    cy.visit('/Projects')
    cy.contains('ProjChanged')

    cy.get('#ProjectsTechSelect').click()
    cy.get(`[data-cy = "Type Script"]`).click()

    cy.get('#ProjectsTypeSelect').click()
    cy.get(`[data-cy = "Application"]`).click()

    cy.get("input[placeholder = 'Search project']").type('proj').type('{enter}')
    cy.wait(2000)
    cy.get('tr').should('have.length', 2)

    cy.get('tr:last').find('button').click()
    cy.get('button').contains('Delete').click()
    cy.contains('testProj 1').should('not.exist')
  })

})

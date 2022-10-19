/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable<Subject> {
        login(login, password): Chainable<Subject>
    }
}

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function asyncFunction1() {
    await sleep(3000);
}

Cypress.Commands.add("login", (login, password) => {
    cy.session([login, password], () => {
        cy.visit("/")
        cy.contains('Welcome to LeviCV')
        cy.contains('Login').click()

        cy.origin(
            //"https://identity-server-1.herokuapp.com/Account/Login/",
            "https://localhost:5001/Account/Login",
            { args: [login, password] },
            ([login, password]) => {
                cy.get("input[type='text']").type(login)
                cy.get("input[type='password']").type(password)
                cy.get("button[type='submit']").click()
                cy.wait(2000)
            }
        )

        // cy.visit('/signin-oidc')
        // cy.wrap(null).then(() => asyncFunction1());
        // cy.visit('/')
    })
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
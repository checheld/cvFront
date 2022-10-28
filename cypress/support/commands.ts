/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable<Subject> {
        login(login, password): Chainable<Subject>
    }
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
    })
});
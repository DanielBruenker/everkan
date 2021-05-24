/// <reference types\="Cypress" />

describe("Test login", () => {

    it("If the user enters the correct credentials, then he should be successfully logged in.", () => {
        cy.visit("http://localhost:3000");
        cy.get('#email').type("Max.Mustermann@gmail.com");
        cy.get('#password').type("password");
        cy.get('.MuiButtonBase-root').click();
        cy.url().should('eq', 'http://localhost:3000/');
    });

})
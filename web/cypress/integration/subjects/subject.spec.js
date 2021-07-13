describe("should fail to create an already existing subject", () => {
  it("Should login as an admin", () => {
    cy.visit("http://localhost:3000");
    cy.get(":nth-child(1) > input").type("admin");
    cy.get(":nth-child(2) > input").type("admin");
    cy.get(".button").click();
  });
  it("should visit subject dashboard", () => {
    cy.visit("http://localhost:3000/subjects");
    cy.url().should("include", "subjects");
  });

  it("Should write the subject's code in the registration form", () => {
    cy.get("#code").type("ESP");
  });
  it("Should write the subject's name in the registration form", () => {
    cy.get("#name").type("Español");
  });
  it("Should write the subject's credit in the registration form", () => {
    cy.get("#credit").type("4");
  });
  it("Should select the subject's teacher in the registration form", () => {
    cy.get("#teacher").select("Francia Mejia");
  });
  it("Should submit the subject", () => {
    cy.get(".button").click();
  });
  it("Should submit the subject", () => {
    cy.get(".state-message").contains("La materia ya existe");
  });
});

describe("should fail to create a new subject with negative credits input", () => {
  it("Should login as an admin", () => {
    cy.visit("http://localhost:3000");
    cy.get(":nth-child(1) > input").type("admin");
    cy.get(":nth-child(2) > input").type("admin");
    cy.get(".button").click();
  });
  it("should visit subject dashboard", () => {
    cy.visit("http://localhost:3000/subjects");
    cy.url().should("include", "subjects");
  });

  it("Should write the subject's code in the registration form", () => {
    cy.get("#code").type("ABCDEFG");
  });
  it("Should write the subject's name in the registration form", () => {
    cy.get("#name").type("Testing");
  });
  it("Should write the subject's credit in the registration form", () => {
    cy.get("#credit").type("-1");
  });
  it("Should select the subject's teacher in the registration form", () => {
    cy.get("#teacher").select("Francia Mejia");
  });
  it("Should submit the subject", () => {
    cy.get(".button").click();
  });
  it("Should submit the subject", () => {
    cy.get(".state-message").contains("Valor de Créditos inválido");
  });
});

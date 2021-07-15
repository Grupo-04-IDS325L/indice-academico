describe("should fail to assign a calification with an input > 100", () => {
  it("Should login as an admin", () => {
    cy.visit("http://localhost:3000");
    cy.get(":nth-child(1) > input").type("admin");
    cy.get(":nth-child(2) > input").type("admin");
    cy.get(".button").click();
  });
  it("should visit subject dashboard", () => {
    cy.visit("http://localhost:3000/students");
    cy.url().should("include", "students");
  });

  it("should go to the students details", () => {
    cy.get('[data-student-id="1080004"] > :nth-child(1)').click();
  });
  it("should insert the calification data", () => {
    cy.get("#subjectCode").select("Español");
    cy.get("#numericGrade").type("101");
  });

  it("Clicks the add button", () => {
    cy.get(".add-entity-form > .button").click();
  });
  it("Should verify the system gives the correct feedback", () => {
    cy.get(".state-message").contains(
      "El valor de la Calificación no debe ser mayor que 100"
    );
  });
});

describe("should fail to assign a calification below 0", () => {
  it("Should login as an admin", () => {
    cy.visit("http://localhost:3000");
    cy.get(":nth-child(1) > input").type("admin");
    cy.get(":nth-child(2) > input").type("admin");
    cy.get(".button").click();
  });
  it("should visit subject dashboard", () => {
    cy.visit("http://localhost:3000/students");
    cy.url().should("include", "students");
  });

  it("should go to the students details", () => {
    cy.get('[data-student-id="1080004"] > :nth-child(1)').click();
  });
  it("should insert the calification data", () => {
    cy.get("#subjectCode").select("Español");
    cy.get("#numericGrade").type("-1");
  });

  it("Clicks the add button", () => {
    cy.get(".add-entity-form > .button").click();
  });
  it("Should verify the system gives the correct feedback", () => {
    cy.get(".state-message");
  });
});

//Update subject teacher
describe("Update subjetc teacher", function () {
  it("Update Inglés subject", () => {
    cy.visit("http://localhost:3000/subjects");
    cy.get('[data-code="ING"] > :nth-child(2)').click();
    cy.get("#teacher").select("Steve Banks");
    cy.get(".update-entity-form > .button").click();
    cy.get(":nth-child(4) > a").should("have.value", "");
  });
});

// Update subject credits
describe("Update subjetc credits", function () {
  it("Update Sistemas operativos subject", () => {
    cy.visit("http://localhost:3000/subjects");
    cy.get('[data-code="OS"] > :nth-child(2)').click();
    cy.get("#credit").type("3");
    cy.get(".update-entity-form > .button").click();
    cy.get(".entity-info > .right-side > :nth-child(2)").should(
      "have.value",
      ""
    );
  });
});

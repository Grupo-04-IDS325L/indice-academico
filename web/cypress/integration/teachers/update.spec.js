// Update teacher name
describe("Update teacher name", function () {
  it("Update Antony Subway name", () => {
    cy.visit("http://localhost:3000/teachers");
    cy.get('[data-teacher-id="60eb403d3e54a534df3aeae4"] > td').click();
    cy.get("#name").type("Anthony Subway");
    cy.get(".update-entity-form > .button").click();
    cy.get(".left-side > :nth-child(4)").should("have.value", "");
  });
});

//Update teacher last name
describe("Update teacher last name", function () {
  it("Update John McCoffee last name", () => {
    cy.visit("http://localhost:3000/teachers");
    cy.get('[data-teacher-id="60ec83285dc0ca38ac461bde"] > td').click();
    cy.get("#name").type("John McCabe");
    cy.get(".update-entity-form > .button").click();
    cy.get(".left-side > :nth-child(4)").should("have.value", "");
  });
});

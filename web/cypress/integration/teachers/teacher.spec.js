describe("test teacher registration process", function () {
  it("visits teacher dashboard", function () {
    cy.visit("http://localhost:3000/teachers");
    cy.url().should("include", "teachers");
  });

  it("writes the teacher's name in the registration form", () => {
    cy.get("input[type='text']").type("John McCoffee");
  });

  it("submits the teacher form for registration", () => {
    cy.get("button").click();
  });

  it("checks if the teacher has been created", () => {
    cy.get("tbody:last-child td").contains("John McCoffee", { timeout: 60000 });
  });
});

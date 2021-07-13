describe("Student`s section test", () => {
  it("Consults that student with Id 10800241 doesn't exists", () => {
    cy.visit("http://localhost:3000/students/10800241");
    cy.url().should("not.include", "students/10800241");
  }),
    it("Consults that student with Id 1080024 has testNoBorrar by Name", () => {
      cy.visit("http://localhost:3000/students/1080024");
      cy.url().should("include", "students/1080024");
      cy.get(".left-side > :nth-child(4)").should("have.text", "testNoBorrar");
    });
});

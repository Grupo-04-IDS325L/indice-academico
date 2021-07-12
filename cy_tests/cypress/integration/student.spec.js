describe("Student`s section test", () => {
    it("Consults a that testNoBorrar is the name of student with Id 1080024", () => {
      cy.visit("http://localhost:3000/students/1080024");
      cy.get(".left-side > :nth-child(4)").should("have.text", "testNoBorrar");
    })
  })
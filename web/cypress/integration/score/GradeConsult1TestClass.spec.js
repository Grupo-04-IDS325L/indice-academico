/// <reference types="cypress" />

describe("my second test", function () {
  it("visit academic system site", function () {
    cy.visit("http://localhost:3000/students/1080025");
    cy.url().should("include", "students");
  });
});

describe("login information", function () {
  it("insert value into textbox", function () {
    cy.get("input[type='text']").type("admin");
    cy.get("input[type='password']").type("admin");
  });
});

describe("login", function () {
  it("login into platform", function () {
    cy.get("button").click();
  });
});

describe("verify Grade", function () {
  it("check if grade is displayed for student", function () {
    cy.get("table").contains("Calificación Numérica");
  });
});

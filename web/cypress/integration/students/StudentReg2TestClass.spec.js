/// <reference types="cypress" />

describe("my second test", function () {
  it("visit academic system site", function () {
    cy.visit("http://localhost:3000/students");
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

describe("insert student name", function () {
  it("insert value into textbox", function () {
    cy.get("input[type='text']").type("ernesto");
  });
});

describe("register student", function () {
  it("select degree for student", function () {
    cy.get("button").click();
  });
});

describe("verify student", function () {
  it("check if student didnt get created", function () {
    cy.get("form >p").contains(
      "La carrera del Estudiante no puede estar vacía"
    );
  });
});

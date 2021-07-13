import React from "react";
import ReactDOM from "react-dom";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";

//Components
import GradesTable from "../components/Student/GradesTable/index";

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it("Renders specific student in the list", () => {
//   act(() => {
//     render(<GradesTable />, container);
//   });
//   expect(container.textContent).toBe("John Ford");
// });

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GradesTable />, div);
});

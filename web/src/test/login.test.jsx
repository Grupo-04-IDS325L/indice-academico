import React from "react";
import { render, screen } from "@testing-library/react";
// import { LoginPage } from "../../../pages/Login";
import { LoginPage } from "../pages/Login";

describe("Login page", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the login page", async () => {
    render(<LoginPage />);
    await screen.findByText("Nombre");

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar sesión" })
    ).toBeInTheDocument();
  });
});

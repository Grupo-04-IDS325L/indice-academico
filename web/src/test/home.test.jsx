import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import HomePage from "../pages/Home/index";

describe("Home page", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the home page", async () => {
    render(<HomePage />);

    await screen.findByText("Sistema Académico INTEC");
    await screen.findByText("Tabla de Índice Académico");

    await waitFor(() => {
      expect(screen.getByText("1089290")).toBeInTheDocument();
      expect(screen.getByText("Alam Sierra")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
      expect(screen.getByText("Summa Cum Laude")).toBeInTheDocument();
    });
  });
});

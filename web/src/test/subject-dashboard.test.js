import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SubjectDashboardPage from "../pages/SubjectDashboard";

describe("SubjectDashboard page", () => {
  beforeEach(async () => {
    render(<SubjectDashboardPage />);

    await screen.findByText(/administración de materias/i);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the subject dashboard page", async () => {
    await waitFor(() => {
      expect(screen.getByText("IDS-340")).toBeInTheDocument();
      expect(screen.getByText("Proceso de Software")).toBeInTheDocument();
      expect(screen.getAllByText("Francia Mejia")).not.toHaveLength(0);
    });

    await waitFor(() => {
      expect(screen.getByText(/nueva materia/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/código/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/nombre de la materia/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/créditos/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/profesor/i)).toBeInTheDocument();
    });
  });

  test("should create a new subject", async () => {
    await screen.findByLabelText("Código");
    userEvent.type(screen.getByLabelText(/código/i), "IDS-350");
    userEvent.type(
      screen.getByLabelText(/nombre de la materia/i),
      "Aseguramiento de Calidad"
    );
    userEvent.type(screen.getByLabelText(/créditos/i), "5");
    await screen.findByRole("option", { name: "Renato Gonzalez" });
    userEvent.selectOptions(screen.getByLabelText(/profesor/i), [
      "Renato Gonzalez",
    ]);

    expect(
      screen.getByRole("option", { name: "Renato Gonzalez" }).selected
    ).toBe(true);

    await waitFor(() => {
      expect(screen.getByDisplayValue("IDS-350")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(/aseguramiento de calidad/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/créditos/i)).toHaveValue("5");
    });

    userEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(
        screen.getByText("IDS-350", { selector: "td" })
      ).toBeInTheDocument();
      expect(
        screen.getByText("Aseguramiento de Calidad", { selector: "td" })
      ).toBeInTheDocument();
      expect(screen.getByText("5", { selector: "td" })).toBeInTheDocument();
      expect(
        screen.getAllByText("Renato Gonzalez", { selector: "td" })
      ).toHaveLength(1);
    });
  });
});

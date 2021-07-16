import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import StudentDashboardPage from "../pages/StudentDashboard";

describe("StudentDashboard page", () => {
  beforeEach(async () => {
    render(<StudentDashboardPage />);

    await screen.findByText(/administración de estudiantes/i);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the student dashboard page", async () => {
    await waitFor(() => {
      expect(screen.getByText("1089290")).toBeInTheDocument();
      expect(screen.getByText("Alam Sierra")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/estudiantes registrados/i)).toBeInTheDocument();
      expect(screen.getByText(/nuevo estudiante/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/carrera/i)).toBeInTheDocument();
    });
  });

  test("should create a new student", async () => {
    await screen.findByLabelText("Carrera");
    userEvent.type(screen.getByLabelText(/nombre/i), "John Rodriguez");
    userEvent.selectOptions(screen.getByLabelText("Carrera"), [
      "LIF - Licenciatura en Ingeniería Financiera",
    ]);

    expect(screen.getByLabelText(/nombre/i)).toHaveValue("John Rodriguez");
    expect(
      screen.getByRole("option", {
        name: "LIF - Licenciatura en Ingeniería Financiera",
      }).selected
    ).toBe(true);

    userEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(screen.getByText("1089090")).toBeInTheDocument();
      expect(
        screen.getByText("John Rodriguez", { selector: "td" })
      ).toBeInTheDocument();
      expect(screen.getByText("LIF", { selector: "td" })).toBeInTheDocument();
    });
  });
});

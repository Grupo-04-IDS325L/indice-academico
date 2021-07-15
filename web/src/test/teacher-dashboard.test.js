import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TeacherDashboardPage from "../pages/TeacherDashboard/index";

describe("TeacherDashboard page", () => {
  beforeEach(async () => {
    render(<TeacherDashboardPage />);

    await screen.findByText(/administración de profesores/i);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the teacher dashboard page", async () => {
    await waitFor(() => {
      expect(screen.getByText("Francia Mejia")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/nuevo profesor/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    });
  });

  test("should create a new teacher", async () => {
    await screen.findByLabelText("Nombre");
    userEvent.type(screen.getByLabelText(/nombre/i), "Renato Gonzalez");

    expect(screen.getByLabelText(/nombre/i)).toHaveValue("Renato Gonzalez");
    userEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Renato Gonzalez", { selector: "td" })
      ).toBeInTheDocument();
    });
  });
});

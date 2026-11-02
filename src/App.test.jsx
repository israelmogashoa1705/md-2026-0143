import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import App from "./App.jsx";

describe("App accessibility", () => {
  it("has no axe violations on the directory view", async () => {
    const { container } = render(<App />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations on the booking form with errors showing", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    await user.click(screen.getAllByRole("button", { name: /view service details/i })[0]);
    await user.click(screen.getAllByRole("button", { name: /book this service/i })[0]);
    await user.click(screen.getByRole("button", { name: /review booking/i }));
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("App keyboard and focus flow", () => {
  it("completes a booking and manages focus on every view change", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Skip link is the first tab stop.
    await user.tab();
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveFocus();

    await user.click(screen.getAllByRole("button", { name: /view service details/i })[0]);
    expect(screen.getByRole("heading", { level: 1, name: /general consultation/i })).toHaveFocus();

    await user.click(screen.getAllByRole("button", { name: /book this service/i })[0]);
    expect(screen.getByRole("heading", { level: 1, name: /book general consultation/i })).toHaveFocus();

    fireEvent.change(screen.getByLabelText(/appointment date/i), { target: { value: "2099-01-01" } });
    await user.selectOptions(screen.getByLabelText(/appointment time/i), "09:00");
    await user.type(screen.getByLabelText(/full name/i), "Test Person");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/contact phone number/i), "0123456789");
    await user.click(screen.getByRole("button", { name: /review booking/i }));

    expect(screen.getByRole("heading", { level: 1, name: /review your booking/i })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: /confirm booking/i }));
    expect(screen.getByRole("heading", { level: 1, name: /your booking is confirmed/i })).toHaveFocus();
    expect(screen.getByText(/^CHC-/)).toBeInTheDocument();
    expect(document.title).toMatch(/booking confirmed/i);
  });
});

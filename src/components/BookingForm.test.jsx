import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "./BookingForm.jsx";
import { services } from "../data/services.js";

const service = services[0];
const blank = { practitioner: "", date: "", time: "", name: "", email: "", phone: "", accessNeeds: "" };

function setup(onReview = vi.fn()) {
  render(<BookingForm service={service} initialBooking={blank} onBack={vi.fn()} onReview={onReview} />);
  return { user: userEvent.setup(), onReview };
}

describe("BookingForm", () => {
  it("associates every input with a label and helper text", () => {
    setup();
    const email = screen.getByLabelText(/email address/i);
    expect(email).toHaveAccessibleDescription(/confirmation here/i);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact phone number/i)).toBeInTheDocument();
  });

  it("shows an error summary and marks invalid fields on empty submit", async () => {
    const { user, onReview } = setup();
    await user.click(screen.getByRole("button", { name: /review booking/i }));

    expect(onReview).not.toHaveBeenCalled();
    expect(await screen.findByRole("group", { name: /problems with your booking/i })).toBeInTheDocument();

    const name = screen.getByLabelText(/full name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/enter your full name/i);
  });

  it("moves focus to the error summary after a failed submit", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /review booking/i }));
    const summary = await screen.findByRole("group", { name: /problems with your booking/i });
    await vi.waitFor(() => expect(summary).toHaveFocus());
  });

  it("announces validation outcomes in a polite live region", async () => {
    const { user } = setup();
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");

    const email = screen.getByLabelText(/email address/i);
    await user.click(email);
    await user.tab();
    expect(status).toHaveTextContent(/email address: enter your email address/i);

    await user.type(email, "person@example.com");
    expect(status).toHaveTextContent(/email address is now valid/i);
    expect(email).toHaveAttribute("aria-invalid", "false");
  });

  it("updates available times when the practitioner changes", async () => {
    const { user } = setup();
    const time = screen.getByLabelText(/appointment time/i);

    await user.selectOptions(screen.getByLabelText(/practitioner/i), "Nurse Thabo Dlamini");
    expect(time).toHaveAttribute("aria-busy", "true");

    expect(await screen.findByText(/appointment times available with nurse thabo dlamini/i)).toBeInTheDocument();
    expect(time).toHaveAttribute("aria-busy", "false");
  });

  it("submits valid details to the review step", async () => {
    const { user, onReview } = setup();
    fireEvent.change(screen.getByLabelText(/appointment date/i), { target: { value: "2099-01-01" } });
    await user.selectOptions(screen.getByLabelText(/appointment time/i), "09:00");
    await user.type(screen.getByLabelText(/full name/i), "Test Person");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/contact phone number/i), "0123456789");
    await user.click(screen.getByRole("button", { name: /review booking/i }));

    expect(onReview).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Test Person", time: "09:00", date: "2099-01-01" })
    );
  });
});
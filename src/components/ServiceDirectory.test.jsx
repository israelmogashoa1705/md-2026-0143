import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceDirectory from "./ServiceDirectory.jsx";

describe("ServiceDirectory", () => {
  it("displays healthcare services", () => {
    render(<ServiceDirectory onChoose={vi.fn()} />);
    expect(
      screen.getByRole("heading", { name: /find care that works for you/i })
    ).toBeInTheDocument();
    expect(screen.getByText("General consultation")).toBeInTheDocument();
  });

  it("filters services by search term and announces the count", async () => {
    const user = userEvent.setup();
    render(<ServiceDirectory onChoose={vi.fn()} />);

    await user.type(screen.getByRole("searchbox", { name: /search healthcare services/i }), "medication");

    expect(screen.getByText("Medication information")).toBeInTheDocument();
    expect(screen.queryByText("General consultation")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 service found");
  });

  it("updates aria-pressed on category buttons", async () => {
    const user = userEvent.setup();
    render(<ServiceDirectory onChoose={vi.fn()} />);

    const prevention = screen.getByRole("button", { name: "Prevention" });
    const all = screen.getByRole("button", { name: "All services" });
    expect(all).toHaveAttribute("aria-pressed", "true");
    expect(prevention).toHaveAttribute("aria-pressed", "false");

    await user.click(prevention);

    expect(prevention).toHaveAttribute("aria-pressed", "true");
    expect(all).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("status")).toHaveTextContent("1 service found");
  });

  it("toggles the filter panel and updates aria-expanded", async () => {
    const user = userEvent.setup();
    render(<ServiceDirectory onChoose={vi.fn()} />);

    const toggle = screen.getByRole("button", { name: /category filters/i });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "Prevention" })).not.toBeInTheDocument();
  });

  it("shows an empty state with a way to reset", async () => {
    const user = userEvent.setup();
    render(<ServiceDirectory onChoose={vi.fn()} />);

    await user.type(screen.getByRole("searchbox"), "zzzz");
    expect(screen.getByRole("status")).toHaveTextContent("0 services found");

    await user.click(screen.getByRole("button", { name: /clear search and filters/i }));
    expect(screen.getByText("General consultation")).toBeInTheDocument();
  });

  it("lets the user select a service with the keyboard", async () => {
    const user = userEvent.setup();
    const onChoose = vi.fn();
    render(<ServiceDirectory onChoose={onChoose} />);

    screen.getAllByRole("button", { name: /view service details/i })[0].focus();
    await user.keyboard("{Enter}");

    expect(onChoose).toHaveBeenCalledTimes(1);
  });
});
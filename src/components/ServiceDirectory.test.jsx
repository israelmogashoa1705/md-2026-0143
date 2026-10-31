
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceDirectory from "./ServiceDirectory";

describe("ServiceDirectory", () => {

    it("displays healthcare services", () => {
        render(<ServiceDirectory onChoose={vi.fn()} />);

        expect(
            screen.getByRole("heading", {
                name: /find care that works for you/i
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText("General consultation")
        ).toBeInTheDocument();
    });

    it("filters services by search term", async () => {
        const user = userEvent.setup();

        render(<ServiceDirectory onChoose={vi.fn()} />);

        const search = screen.getByRole("searchbox", {
            name: /search healthcare services/i
        });

        await user.type(search, "medication");

        expect(
            screen.getByText("Medication information")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("General consultation")
        ).not.toBeInTheDocument();
    });

    it("updates the selected category state", async () => {
        const user = userEvent.setup();

        render(<ServiceDirectory onChoose={vi.fn()} />);

        const prevention = screen.getByRole("button", {
            name: "Prevention"
        });

        await user.click(prevention);

        expect(prevention).toHaveAttribute(
            "aria-pressed",
            "true"
        );
    });

    it("allows the user to select a service", async () => {
        const user = userEvent.setup();
        const onChoose = vi.fn();

        render(<ServiceDirectory onChoose={onChoose} />);

        await user.click(
            screen.getAllByRole("button", {
                name: /view service details/i
            })[0]
        );

        expect(onChoose).toHaveBeenCalledTimes(1);
    });
});

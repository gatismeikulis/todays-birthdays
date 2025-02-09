import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Modal } from "./modal";

describe("Modal Component", () => {
  test("closes the modal when the Escape key is pressed", () => {
    const onClose = vi.fn();

    render(<Modal title="title" message="message" onClose={onClose} />);

    // Simulate pressing the Escape key
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("renders the modal with the correct title and message", () => {
    const onClose = vi.fn();

    render(<Modal title="Test Modal" message="This is a test message" onClose={onClose} />);

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("This is a test message")).toBeInTheDocument();
  });
});

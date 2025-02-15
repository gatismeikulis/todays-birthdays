import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BirthRecord } from "../../lib/types";
import { BirthCard } from "./birth-card";

describe("BirthCard Component", () => {
  const birthRecord: BirthRecord = {
    name: "John Doe",
    year: 1990,
    description: "A famous person",
    imageSrc: "http://example.com/image.jpg",
    linkToArticle: "http://example.com/article",
  };

  test("renders birth card with given props", () => {
    render(<BirthCard record={birthRecord} />);
    expect(screen.getByText("John Doe")).toBeVisible();
    expect(screen.getByText("1990")).toBeInTheDocument();
    expect(screen.getByText("A famous person")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "http://example.com/image.jpg");
    expect(screen.getByRole("link")).toHaveAttribute("href", "http://example.com/article");
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});

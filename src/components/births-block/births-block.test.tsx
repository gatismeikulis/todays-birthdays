import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { BirthsBlock } from "./births-block";

describe("BirthsBlock", () => {
  const queryClient = new QueryClient();

  test("should fetch and show birth data when button is clicked", async () => {
    const mockedSingleBirthData = {
      text: "John Doe, A famous person",
      year: 1990,
      pages: [
        {
          thumbnail: {
            source: "http://example.com/image.jpg",
          },
          content_urls: {
            desktop: {
              page: "http://example.com/desktop",
            },
            mobile: {
              page: "http://example.com/mobile",
            },
          },
        },
      ],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: vi.fn(() => Promise.resolve({ births: [mockedSingleBirthData] })),
          ok: true,
        }),
      ),
    );

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <BirthsBlock />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(screen.queryByTestId("spinner")).toBeNull(); // Spinner should not be present initially

    expect(screen.getByText("Click here to discover today's birthdays!")).toBeInTheDocument(); // Button should be present

    fireEvent.click(screen.getByText("Click here to discover today's birthdays!")); // Click the button

    expect(screen.getByTestId("spinner")).toBeInTheDocument(); // Spinner should be present while fetching data

    expect(screen.queryByText("Click here to discover today's birthdays!")).toBeNull(); // Button should not be present after clicked

    await vi.waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("1990")).toBeInTheDocument();
      expect(screen.getByText("A famous person")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("src", "http://example.com/image.jpg");
      expect(screen.getByRole("link")).toHaveAttribute("href", "http://example.com/desktop");
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });
  });
});

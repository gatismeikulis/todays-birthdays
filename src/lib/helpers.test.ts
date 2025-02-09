import { describe, it, expect } from "vitest";
import { transformBirthData, getPaginationInfo } from "./helpers";
import { Birth } from "./types";

describe("transformBirthData", () => {
  it("transforms birth data into a birth record for desktop", () => {
    const birth: Birth = {
      text: "John Doe, A famous person",
      year: 1990,
      pages: [
        {
          thumbnail: { source: "http://example.com/image.jpg" },
          content_urls: {
            desktop: { page: "http://example.com/desktop" },
            mobile: { page: "http://example.com/mobile" },
          },
        },
      ],
    };

    const expectedBirthRecord = {
      name: "John Doe",
      description: " A famous person",
      year: 1990,
      imageSrc: "http://example.com/image.jpg",
      linkToArticle: "http://example.com/desktop",
    };

    const birthRecord = transformBirthData(birth, false);

    expect(birthRecord).toEqual(expectedBirthRecord);
  });

  it("transforms birth data into a birth record for mobile", () => {
    const birth: Birth = {
      text: "John Doe, A famous person",
      year: 1990,
      pages: [
        {
          thumbnail: { source: "http://example.com/image.jpg" },
          content_urls: {
            desktop: { page: "http://example.com/desktop" },
            mobile: { page: "http://example.com/mobile" },
          },
        },
      ],
    };

    const expectedBirthRecord = {
      name: "John Doe",
      description: " A famous person",
      year: 1990,
      imageSrc: "http://example.com/image.jpg",
      linkToArticle: "http://example.com/mobile",
    };

    const birthRecord = transformBirthData(birth, true);

    expect(birthRecord).toEqual(expectedBirthRecord);
  });

  it("handles missing thumbnail and content_urls gracefully", () => {
    const birth: Birth = {
      text: "Jane Doe, Another famous person",
      year: 1985,
      pages: [],
    };

    const expectedBirthRecord = {
      name: "Jane Doe",
      description: " Another famous person",
      year: 1985,
      imageSrc: undefined,
      linkToArticle: undefined,
    };

    const birthRecord = transformBirthData(birth, false);

    expect(birthRecord).toEqual(expectedBirthRecord);
  });
});

describe("getPaginationInfo", () => {
  it("calculates pagination info correctly", () => {
    const paginationInfo = getPaginationInfo({
      totalItems: 100,
      currentPage: 2,
      itemsPerPage: 10,
    });

    const expectedPaginationInfo = {
      totalPages: 10,
      startIndex: 10,
      endIndex: 20,
    };

    expect(paginationInfo).toEqual(expectedPaginationInfo);
  });

  it("handles edge case where totalItems is zero", () => {
    const paginationInfo = getPaginationInfo({
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 10,
    });

    const expectedPaginationInfo = {
      totalPages: 0,
      startIndex: 0,
      endIndex: 10,
    };

    expect(paginationInfo).toEqual(expectedPaginationInfo);
  });
});

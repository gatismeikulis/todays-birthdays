import { describe, it, expect } from "vitest";
import { getMonthAndDayZeroPadded, getDateFormatted } from "./utils";

describe("getMonthAndDayZeroPadded", () => {
  it("returns the correct month and day zero-padded for two digit month and day", () => {
    const date = new Date(2023, 10, 15); // November 15, 2023
    const expectedMonth = "11";
    const expectedDay = "15";

    const { month, day } = getMonthAndDayZeroPadded(date);

    expect(month).toBe(expectedMonth);
    expect(day).toBe(expectedDay);
  });
  it("returns the correct month and day zero-padded for single digit month and day", () => {
    const date = new Date(2023, 3, 2); // April 2, 2023
    const expectedMonth = "04";
    const expectedDay = "02";

    const { month, day } = getMonthAndDayZeroPadded(date);

    expect(month).toBe(expectedMonth);
    expect(day).toBe(expectedDay);
  });
});

describe("getDateFormatted", () => {
  it('returns the date formatted as "Month Day" for a given date', () => {
    const date = new Date(2023, 9, 5); // October 5, 2023
    const expectedFormattedDate = "October 5";

    const formattedDate = getDateFormatted(date);

    expect(formattedDate).toBe(expectedFormattedDate);
  });
});

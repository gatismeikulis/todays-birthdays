import { useQuery } from "@tanstack/react-query";
import { birthsResponseSchema } from "../schemas";
import { getTodaysMonthAndDayZeroPadded } from "../utils";
import { Birth } from "../types";
import { transformBirthData } from "../helpers";

const BASE_URL = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births";

export function usePaginatedTodaysBirths(
  currentPage: number,
  itemsPerPage: number,
  enabled = false,
) {
  const { data, refetch, status } = useQuery({
    queryKey: ["todays-birthdays"],
    queryFn: fetchBirths,
    enabled, // 'false' by default, using 'refetch' to activate
  });

  const safeData = data ?? [];
  const itemsTotal = safeData.length;

  const totalPages = Math.ceil(itemsTotal / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const slicedData = safeData.slice(startIndex, endIndex);

  const transformedData = slicedData.map(transformBirthData);

  return {
    birthRecords: transformedData,
    totalItems: safeData.length,
    status,
    refetch,
    totalPages,
  };
}

async function fetchBirths(): Promise<Birth[]> {
  const { day, month } = getTodaysMonthAndDayZeroPadded();
  const response = await fetch(`${BASE_URL}/${month}/${day}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const jsonData = await response.json();
  // validate data using Zod schema
  const result = birthsResponseSchema.safeParse(jsonData);
  if (!result.success) {
    throw new Error("Failed to parse the response");
  }
  // sort by year - newest first
  return result.data.births.sort((a, b) => b.year - a.year);
}

import { useQuery } from "@tanstack/react-query";
import { birthsResponseSchema } from "../schemas";
import { getMonthAndDayZeroPadded } from "../utils";
import { Birth } from "../types";

const BASE_URL = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births";

export function useQueryBirthsOnDate(date: Date | null) {
  const { data, refetch, status, isLoading } = useQuery({
    queryKey: [date], // not perfect because it will consider same date on different year as different. but it's good enough for this project
    queryFn: () => fetchBirths(date),
    enabled: !!date?.getDay, // 'false' by default, using 'refetch' to activate
  });

  return {
    data,
    status,
    refetch,
    isLoading,
  };
}

async function fetchBirths(date: Date | null): Promise<Birth[]> {
  if (date == null) {
    throw new Error("Date not provided");
  }
  const { day, month } = getMonthAndDayZeroPadded(date);
  const response = await fetch(`${BASE_URL}/${month}/${day}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const jsonData: unknown = await response.json();
  // validate data using Zod schema
  const result = birthsResponseSchema.safeParse(jsonData);
  if (!result.success) {
    throw new Error("Failed to parse the response");
  }
  // sort by year - newest first
  return result.data.births.sort((a, b) => b.year - a.year);
}

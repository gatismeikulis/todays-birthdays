import { useQuery } from "@tanstack/react-query";
import { birthsResponseSchema } from "../schemas";
import { getTodaysMonthAndDayZeroPadded } from "../utils";
import { Birth } from "../types";

const BASE_URL = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births";

export function useQueryBirthdaysToday() {
  const { data, status, refetch } = useQuery({
    queryKey: ["todays-birthdays"],
    queryFn: fetchBirths,
    enabled: false, // 'false' by default, using 'refetch' to activate
  });

  return { data, status, refetch };
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

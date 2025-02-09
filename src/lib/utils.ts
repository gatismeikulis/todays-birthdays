export function getMonthAndDayZeroPadded(date: Date) {
  const rawMonth = date.getMonth();
  const rawDay = date.getDate();
  const month = (rawMonth + 1).toString().padStart(2, "0");
  const day = rawDay.toString().padStart(2, "0");
  return { month, day };
}

export function getDateFormatted(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
}

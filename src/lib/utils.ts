export function getTodaysMonthAndDayZeroPadded() {
  const date = new Date();
  const rawMonth = date.getMonth();
  const rawDay = date.getDate();
  const month = (rawMonth + 1).toString().padStart(2, "0");
  const day = rawDay.toString().padStart(2, "0");
  return { month, day };
}

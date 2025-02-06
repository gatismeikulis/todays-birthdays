import { useMemo, useState } from "react";
import { sliceAndTransformBirths } from "./lib/helpers";
import { useQueryBirthdaysToday } from "./lib/hooks/use-query-birthdays-today";

const PAGE_NUMBER = 1;

export function App() {
  const [showFetchButton, setShowFetchButton] = useState(true);
  const { data, status, refetch } = useQueryBirthdaysToday();

  console.log(status);

  const birthRecords = useMemo(() => {
    if (status !== "success") return [];
    return sliceAndTransformBirths(data ?? [], PAGE_NUMBER); // page number should not be hardcoded
  }, [data, status]);

  if (showFetchButton)
    return (
      <div>
        <button
          onClick={() => {
            refetch();
            setShowFetchButton(false);
          }}
        >
          GET DATA
        </button>
      </div>
    );

  if (status === "pending") return <div>Loading data...</div>;

  if (status === "error") return <div>Error fetching or parsing data</div>;

  return (
    <div>
      {birthRecords.map((birth) => {
        return (
          <div key={birth.name}>
            <p>{birth.name}</p>
            <p>{birth.year}</p>
          </div>
        );
      })}
    </div>
  );
}

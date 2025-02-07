import { useState } from "react";
import { usePaginatedTodaysBirths } from "./lib/hooks/use-paginated-todays-births";
import { RECORDS_PER_PAGE } from "./lib/constants";
import { usePageParam } from "./lib/hooks/use-page-param";

export function App() {
  const [showFetchButton, setShowFetchButton] = useState(true);
  const { currentPage, setPage } = usePageParam();
  const { birthRecords, status, refetch } = usePaginatedTodaysBirths(currentPage, RECORDS_PER_PAGE);

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
      <button
        onClick={() => {
          setPage(currentPage + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setPage(currentPage - 1);
        }}
      >
        -
      </button>
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

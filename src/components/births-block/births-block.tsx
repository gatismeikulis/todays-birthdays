import { useMemo, useState } from "react";
import { useQueryTodaysBirths } from "../../lib/hooks/use-query-todays-births";
import { usePageParam } from "../../lib/hooks/use-page-param";
import { RECORDS_PER_PAGE } from "../../lib/constants";
import { BirthCard } from "../birth-card/birth-card";
import { getPaginationInfo, transformBirthData } from "../../lib/helpers";
import { Pagination } from "../pagination/pagination";
import { Button } from "../button/button";
import styles from "./births-block.module.css";
import { Modal } from "../modal/modal";
import { Spinner } from "../spinner/spinner";

export function BirthsBlock() {
  const [showFetchButton, setShowFetchButton] = useState(true);
  const { data, status, refetch } = useQueryTodaysBirths();
  const { currentPage, setPage } = usePageParam();

  const { birthRecords, totalPages } = useMemo(() => {
    if (!data) return { birthRecords: [], totalPages: 0 };
    const { totalPages, startIndex, endIndex } = getPaginationInfo({
      totalItems: data.length,
      currentPage,
      itemsPerPage: RECORDS_PER_PAGE,
    });
    const birthRecords = data.slice(startIndex, endIndex).map(transformBirthData);
    return { birthRecords, totalPages };
  }, [currentPage, data]);

  function getTodaysBirths() {
    setShowFetchButton(false);
    refetch();
  }

  if (showFetchButton) {
    return (
      <div className={styles.buttonWrapper}>
        <Button onClick={getTodaysBirths}>Click here to discover today's birthdays!</Button>
      </div>
    );
  }

  if (status === "pending") return <Spinner />;

  if (status === "error")
    return (
      <Modal
        title="Error"
        message="Something went wrong while fetching data! Please try again or contact support!"
        onClose={() => {
          setShowFetchButton(true);
        }}
      />
    );

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
      <ul className={styles.list}>
        {birthRecords.map((birth, index) => {
          return (
            <li key={`${index.toString()}${birth.name}`} className={styles.item}>
              <BirthCard record={birth} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

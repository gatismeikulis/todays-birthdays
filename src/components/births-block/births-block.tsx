import { useMemo, useState } from "react";
import { useQueryBirthsOnDate } from "../../lib/hooks/use-query-todays-births";
import { usePageParam } from "../../lib/hooks/use-page-param";
import { RECORDS_PER_PAGE } from "../../lib/constants";
import { BirthCard } from "../birth-card/birth-card";
import { getPaginationInfo, transformBirthData } from "../../lib/helpers";
import { Pagination } from "../pagination/pagination";
import { Button } from "../button/button";
import styles from "./births-block.module.css";
import { Modal } from "../modal/modal";
import { Spinner } from "../spinner/spinner";

const today = new Date();

export function BirthsBlock() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showFetchButton, setShowFetchButton] = useState(true);
  const { data, status, isLoading } = useQueryBirthsOnDate(selectedDate);
  const { currentPage, setPage } = usePageParam();

  const { birthRecords, totalPages } = useMemo(() => {
    if (!data) return { birthRecords: [], totalPages: 0 };
    const { totalPages, startIndex, endIndex } = getPaginationInfo({
      totalItems: data.length,
      currentPage,
      itemsPerPage: RECORDS_PER_PAGE,
    });
    const isSmallScreen = window.innerWidth < 600; // Assuming user is on mobile screen if width is less than 600px
    const birthRecords = data
      .slice(startIndex, endIndex)
      .map((birth) => transformBirthData(birth, isSmallScreen));
    return { birthRecords, totalPages };
  }, [currentPage, data]);

  function getTodaysBirths() {
    setShowFetchButton(false);
    setSelectedDate(today);
  }

  if (showFetchButton) {
    return (
      <div className={styles.buttonWrapper}>
        <Button type="button" onClick={getTodaysBirths}>
          Click here to discover today's birthdays!
        </Button>
      </div>
    );
  }

  if (isLoading) return <Spinner />;

  function isSpecificDay(date: Date, day: number, month: number): boolean {
    return date.getDate() === day && date.getMonth() === month;
  }

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
      <div className={styles.nextPrevButtons}>
        <Button
          type="button"
          onClick={() => {
            setSelectedDate((current) => {
              const newDate = new Date(current ?? today);
              if (isSpecificDay(newDate, 1, 2)) {
                return new Date(2000, 1, 29);
              } else {
                newDate.setDate(newDate.getDate() - 1);
                return newDate;
              }
            });
          }}
        >
          Explore day before
        </Button>
        <Button
          type="button"
          onClick={() => {
            setSelectedDate((current) => {
              const newDate = new Date(current ?? today);
              if (isSpecificDay(newDate, 28, 1)) {
                return new Date(2000, 1, 29);
              } else {
                newDate.setDate(newDate.getDate() + 1);
                return newDate;
              }
            });
          }}
        >
          Expore next day
        </Button>
      </div>
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

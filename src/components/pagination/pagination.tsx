import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const paginationItems = createPaginationItems(currentPage, totalPages);

  function onPageIncrement() {
    onPageChange(currentPage + 1);
  }

  function onPageDecrement() {
    onPageChange(currentPage - 1);
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={onPageDecrement} disabled={currentPage <= 1} className={styles.button}>
        ←
      </button>
      <div className={styles.numbers}>
        {paginationItems.map((item, index) =>
          item === 0 ? (
            <span key={`dots-${index.toString()}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => {
                onPageChange(item);
              }}
              className={`${styles.number} ${currentPage === item ? styles.active : ""}`}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <button
        onClick={onPageIncrement}
        disabled={currentPage >= totalPages}
        className={styles.button}
      >
        →
      </button>
    </div>
  );
}

function createPaginationItems(currentPage: number, totalPages: number) {
  const items: number[] = [];
  const needGaps = totalPages > 7;

  if (!needGaps) {
    for (let i = 1; i <= totalPages; i++) items.push(i);
    return items;
  }

  const gapNumber = 0;

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) items.push(i);
    items.push(gapNumber);
    items.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    items.push(1);
    items.push(gapNumber);
    for (let i = totalPages - 4; i <= totalPages; i++) items.push(i);
  } else {
    items.push(1);
    items.push(gapNumber);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) items.push(i);
    items.push(gapNumber);
    items.push(totalPages);
  }

  return items;
}

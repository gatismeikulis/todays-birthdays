import styles from "./spinner.module.css";

export function Spinner() {
  return (
    <div data-testid="spinner" className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  );
}

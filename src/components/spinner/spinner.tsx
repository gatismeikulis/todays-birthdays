import styles from "./spinner.module.css";

export function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  );
}

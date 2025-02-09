import { useEffect } from "react";
import styles from "./modal.module.css";

type ModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export function Modal({ title, message, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}

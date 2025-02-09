import { BirthRecord } from "../../lib/types";
import styles from "./birth-card.module.css";
import imgFallback from "../../assets/no-preview.jpg";

type BirthCardProps = {
  record: BirthRecord;
};

export function BirthCard({ record }: BirthCardProps) {
  const { name, year, description, imageSrc, linkToArticle } = record;

  return (
    <article className={styles.card}>
      <div className={styles.textWrapper}>
        <h3 className={styles.year}>{year}</h3>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageSrc ?? imgFallback} alt={name} loading="lazy" />
      </div>
      <a className={styles.link} href={linkToArticle} target="_blank" rel="noopener noreferrer">
        READ MORE...
      </a>
    </article>
  );
}

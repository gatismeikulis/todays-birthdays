import { BirthsBlock } from "../../components/births-block/births-block";
import { Container } from "../../components/container/container";
import { getDateFormatted } from "../../lib/utils";
import styles from "./home.module.css";

export function Home() {
  return (
    <Container>
      <h1 className={styles.title}>Today's Birthdays - {getDateFormatted(new Date())} </h1>
      <BirthsBlock />
    </Container>
  );
}

import { BirthsBlock } from "../../components/births-block/births-block";
import { Container } from "../../components/container/container";
import styles from "./home.module.css";

export function Home() {
  return (
    <Container>
      <h1 className={styles.title}>Births </h1>
      <BirthsBlock />
    </Container>
  );
}

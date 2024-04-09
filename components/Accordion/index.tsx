import { PropsWithChildren } from "react";
import * as styles from "@/styles/document.css";
import { content } from "./style.css";

interface Props extends PropsWithChildren {
  title: string;
  open?: boolean;
}

const Accordion = ({ title, open = true, children }: Props) => {
  return (
    <details className={styles.details} open={open}>
      <summary className={styles.summary}>{title}</summary>
      <article className={content}>{children}</article>
    </details>
  );
};

export default Accordion;

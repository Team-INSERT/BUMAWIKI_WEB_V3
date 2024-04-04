import { PropsWithChildren } from "react";
import * as styles from "./style.css";

interface AccordionProps extends PropsWithChildren {
  title: string;
  open?: boolean;
}

const Accordion = ({ title, open = true, children }: AccordionProps) => {
  return (
    <div className={styles.container}>
      <details className={styles.details} open={open}>
        <summary className={styles.summary}>
          <div className={styles.title}>{title}</div>
        </summary>
        <div className={styles.content}>{children}</div>
      </details>
    </div>
  );
};

export default Accordion;

import React, { PropsWithChildren } from "react";
import * as styles from "./style.css";

interface AccordionProps extends PropsWithChildren {
  title: string;
}

const Accordion = ({ title, children }: AccordionProps) => {
  return (
    <div className={styles.container}>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <div className={styles.title}>{title}</div>
        </summary>
        <div className={styles.content}>{children}</div>
      </details>
    </div>
  );
};

export default Accordion;

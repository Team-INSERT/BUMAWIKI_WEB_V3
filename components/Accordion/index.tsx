import React, { PropsWithChildren } from "react";
import * as styles from "./style.css";

interface PropsType extends PropsWithChildren {
  title: string;
}

const Accordion = ({ title, children }: PropsType) => {
  return (
    <div className={styles.container}>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <div className={styles.title}>{title}</div>
        </summary>
        {children}
      </details>
    </div>
  );
};

export default Accordion;

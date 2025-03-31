"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import * as styles from "@/styles/document.css";
import { content } from "./style.css";

interface Props extends PropsWithChildren {
  title: string;
  open?: boolean;
}

const Accordion = ({ title, open = true, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen((prev) => !prev);
    }, Math.random() * 5000);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <details className={styles.details} open={isOpen}>
      <summary className={styles.summary}>{title}</summary>
      <article className={content}>{children}</article>
    </details>
  );
};

export default Accordion;

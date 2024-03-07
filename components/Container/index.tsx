import Link from "next/link";
import React, { PropsWithChildren } from "react";
import * as styles from "./style.css";

interface ContainerProps extends PropsWithChildren {
  classify: string;
  title: string;
}

const Container = ({ classify, title, children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>부마위키:{title}</h1>
      <Link href={`/${classify}`} className={styles.classifyBox}>
        분류 : <span className={styles.classify}>{classify}</span>
      </Link>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Container;

import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { useDocs } from "@/hooks/useDocs";
import * as styles from "./style.css";

interface ContainerProps extends PropsWithChildren {
  classify: string;
  title: string;
}

const Container = ({ classify, title, children }: ContainerProps) => {
  const { translateClassify } = useDocs();
  const classifyHref = classify === "부마위키" ? "/" : `/${classify}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>부마위키:{title}</h1>
      <Link href={classifyHref} className={styles.classifyBox}>
        분류 :{" "}
        <span className={styles.classify}>{translateClassify(classify)}</span>
      </Link>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Container;

import React from "react";
import Link from "next/link";
import * as styles from "./style.css";

const Classify = () => {
  return (
    <Link href="/teacher" className={styles.container}>
      분류 : <span className={styles.classify}>선생님</span>
    </Link>
  );
};

export default Classify;

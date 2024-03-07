import React from "react";
import { ArrowIcon } from "@/assets";
import { theme } from "@/styles";
import * as styles from "./style.css";

const Aside = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.titleBox}>
        <span className={styles.titleText}>최근 수정된 문서</span>
      </div>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className={styles.docs}>
          <a className={styles.docsName} href="/">
            한예준(학생)
          </a>
          <span className={styles.docsLastModified}>3시간 전</span>
        </div>
      ))}
      <div className={styles.pageBox}>
        <button className={styles.pageButton}>
          <span className={styles.pageButtonText}>
            <ArrowIcon
              direction="left"
              width={11}
              height={11}
              viewBox="0 0 11 20"
              fill={theme.primary}
            />
            이전
          </span>
        </button>
        <button className={styles.pageButton}>
          <span className={styles.pageButtonText}>
            다음
            <ArrowIcon
              direction="right"
              width={11}
              height={11}
              viewBox="0 0 11 20"
              fill={theme.primary}
            />
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Aside;

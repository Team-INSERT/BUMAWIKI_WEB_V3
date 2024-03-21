"use client";

import { docsQuery } from "@/services/docs/docs.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";
import { DocsListItem } from "@/types/docsListItem.interface";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ko";
import { ArrowIcon } from "@/assets";
import { theme } from "@/styles";
import * as styles from "./style.css";

const Aside = () => {
  const [page, setPage] = useState(0);
  const { data: docsList } = useSuspenseQuery(docsQuery.lastModified(page));

  const handleIncreasePageNumber = () => {
    if (docsList.length === 12) setPage((prev) => prev + 1);
  };

  const handleDecreasePageNumber = () => {
    if (page !== 0) setPage((prev) => prev - 1);
  };

  return (
    <Suspense>
      <div className={styles.body}>
        <aside className={styles.container}>
          <div className={styles.titleBox}>
            <span className={styles.titleText}>최근 변경</span>
          </div>
          <div className={styles.list}>
            {docsList?.map((docs: DocsListItem) => (
              <Link href={`/docs/${docs.title}`} key={docs.id} className={styles.docs}>
                <span className={styles.docsName}>{docs.title}</span>
                <span className={styles.docsLastModified}>
                  {moment(docs.lastModifiedAt).fromNow()}
                </span>
              </Link>
            ))}
          </div>
        </aside>
        <div className={styles.pageBox}>
          <button className={styles.pageButton} onClick={handleDecreasePageNumber}>
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
          <button className={styles.pageButton} onClick={handleIncreasePageNumber}>
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
      </div>
    </Suspense>
  );
};

export default Aside;

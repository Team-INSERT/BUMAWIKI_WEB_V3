"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/assets";
import { theme } from "@/styles";
import moment from "moment";
import "moment/locale/ko";
import { DocsListItem } from "@/types/docsListItem.interface";
import { HydrationBoundary } from "@tanstack/react-query";
import { useLastModified } from "@/services/docs/useDocsService";
import * as styles from "./style.css";

const Aside = () => {
  const [page, setPage] = useState(0);
  const { isSuccess, data } = useLastModified(page);
  const [docsList, setDocsList] = useState(data);

  useEffect(() => {
    if (isSuccess) setDocsList(data);
  }, [isSuccess, page]);

  const handleIncreasePageNumber = () => {
    if (docsList.length !== 12) return;
    setPage((prev) => prev + 1);
  };

  const handleDecreasePageNumber = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };

  return (
    <HydrationBoundary>
      <div className={styles.body}>
        <aside className={styles.container}>
          <div className={styles.titleBox}>
            <span className={styles.titleText}>최근 변경</span>
          </div>
          <div className={styles.list}>
            {docsList?.map((docs: DocsListItem) => (
              <Link
                href={`/docs/${docs.title}`}
                key={docs.id}
                className={styles.docs}
              >
                <span className={styles.docsName}>{docs.title}</span>
                <span className={styles.docsLastModified}>
                  {moment(docs.lastModifiedAt).fromNow()}
                </span>
              </Link>
            ))}
          </div>
        </aside>
        <div className={styles.pageBox}>
          <button
            className={styles.pageButton}
            onClick={handleDecreasePageNumber}
          >
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
          <button
            className={styles.pageButton}
            onClick={handleIncreasePageNumber}
          >
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
    </HydrationBoundary>
  );
};

export default Aside;

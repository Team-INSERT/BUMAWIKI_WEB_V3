"use client";

import { docsQuery } from "@/services/docs/docs.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DocsListItem } from "@/types/docsListItem.interface";
import Link from "next/link";
import { ArrowIcon } from "@/assets";
import { useDate } from "@/hooks/useDate";
import { theme } from "@/styles";
import * as styles from "./style.css";

const Aside = () => {
  const { fromNow } = useDate();
  const [page, setPage] = useState(0);
  const { data: lastModifiedList } = useSuspenseQuery(docsQuery.lastModified(page));

  const handleDecreasePageNumber = () => {
    if (page !== 0) setPage((prev) => prev - 1);
  };

  const handleIncreasePageNumber = () => {
    // 문서 MAX_PAGE_LENGTH개 모두 불러오지 못했다면 마지막 페이지로 간주
    const isLastPage = lastModifiedList.length !== config.MAX_PAGE_LENGTH;
    if (!isLastPage) setPage((prev) => prev + 1);
  };

  return (
    <main className={styles.container}>
      <article className={styles.lastModifiedBox}>
        <header className={styles.header}>최근 변경</header>
        <ul className={styles.list}>
          {lastModifiedList.map((docs: DocsListItem) => (
            <Link href={`/docs/${docs.title}`} className={styles.listItem} key={docs.id}>
              <span className={styles.docsName}>{docs.title}</span>
              <time className={styles.docsLastModifiedAt}>{fromNow(docs.lastModifiedAt)}</time>
            </Link>
          ))}
        </ul>
      </article>
      <figure className={styles.pagination}>
        <button className={styles.paginationButton} onClick={handleDecreasePageNumber}>
          <ArrowIcon direction="left" {...config.arrowIcon} />
          이전
        </button>
        <button className={styles.paginationButton} onClick={handleIncreasePageNumber}>
          다음
          <ArrowIcon direction="right" {...config.arrowIcon} />
        </button>
      </figure>
    </main>
  );
};

const config = {
  arrowIcon: {
    width: 11,
    height: 11,
    viewBox: "0 0 11 20",
    fill: theme.primary,
  },
  MAX_PAGE_LENGTH: 12,
};

export default Aside;

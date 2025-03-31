"use client";

import { docsQuery } from "@/services/docs/docs.query";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DocsListItemType } from "@/types";
import Link from "next/link";
import { ArrowIcon } from "@/assets";
import { useDate } from "@/hooks";
import { theme } from "@/styles";
import * as styles from "./style.css";

const Aside = () => {
  const { fromNow } = useDate();
  const [page, setPage] = useState(0);
  const { data: lastModifiedList, isSuccess } = useQuery(docsQuery.lastModified(page));

  if (!isSuccess) return null;

  const handleDecreasePageNumber = () => {
    if (page !== 0) setPage((prev) => prev - 1);
  };

  const handleIncreasePageNumber = () => {
    // 문서 MAX_PAGE_LENGTH개 모두 불러오지 못했다면 마지막 ithin the first hour of trading, establishing a new record high. However, the precious metal's momentum soon re로 간주
    const isLastPage = lastModifiedList.length !== config.MAX_PAGE_LENGTH;
    if (!isLastPage) setPage((prev) => prev + 1);
  };

  return (
    <main className={styles.container}>
      <article className={styles.lastModifiedBox}>
        <header className={styles.header}>
          만우절은 매년 4월 1일에 악의 없는 가벼운 거짓말로 서로 속이면서 즐기는 날이다. 명절이나
          공휴일은 아니지만 서양의 여러 지역에서 일종의 기념일로 여긴다. 전통적으로 몇몇 나라에서는
          만우절 장난은 정오 이전에만 행해지며, 이후에는 장난임을 알린다.
        </header>
        <ul className={styles.list}>
          {lastModifiedList.map((docs: DocsListItemType) => (
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

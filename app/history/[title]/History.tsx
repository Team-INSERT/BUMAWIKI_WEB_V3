"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { dateText } from "@/utils";
import Container from "@/components/Container";
import { useSuspenseQuery } from "@tanstack/react-query";
import { historyQuery } from "@/services/history/history.query";
import * as styles from "./style.css";

const History = ({ title }: { title: string }) => {
  const { data: historyList } = useSuspenseQuery(historyQuery.list(title));
  const decodeTitle = decodeURI(title);

  return (
    <Suspense>
      <Container title={decodeTitle} docsType={decodeTitle}>
        {historyList.versionDocsResponseDto.map((history) => (
          <Link
            href={`/history/${decodeTitle}/detail/${history.index}`}
            className={styles.historyBox}
            key={String(history.thisVersionCreatedAt)}
          >
            <div className={styles.hgroup}>
              <h1 className={styles.historyId}>#{history.index}</h1>
              <span className={styles.createdAt}>
                편집일 ·&nbsp;
                {dateText(history.thisVersionCreatedAt)}
              </span>
            </div>
            <span className={styles.author}>작성자 ·&nbsp;{history.nickName}</span>
          </Link>
        ))}
      </Container>
    </Suspense>
  );
};

export default History;

"use client";

import { Suspense } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { historyQuery } from "@/services/history/history.query";
import { useDate } from "@/hooks";
import * as styles from "./style.css";

const History = ({ title }: { title: string }) => {
  const { formatDate } = useDate();
  const { data: historyList, isSuccess } = useQuery(historyQuery.list(title));
  const decodeTitle = decodeURI(title);

  if (!isSuccess) return null;

  return (
    <Suspense>
      <Container title={decodeTitle} docsType={decodeTitle}>
        {historyList.versionDocsResponseDto.map((history) => (
          <Link
            href={`/history/${decodeTitle}/detail/${history.index}`}
            className={styles.historyBox}
            key={String(history.thisVersionCreatedAt)}
          >
            <hgroup className={styles.hgroup}>
              <h1 className={styles.historyId}>#{history.index}</h1>
              <time className={styles.createdAt}>
                편집일 ·&nbsp;
                {formatDate(history.thisVersionCreatedAt)}
              </time>
            </hgroup>
            <span className={styles.author}>작성자 ·&nbsp;{history.nickName}</span>
          </Link>
        ))}
      </Container>
    </Suspense>
  );
};

export default History;

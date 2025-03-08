"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { VersionDifferent } from "@/enum";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { historyQuery } from "@/services/history/history.query";
import * as styles from "./style.css";

interface HistoryType {
  operation: string;
  text: string;
}

const HistoryDetail: FC<{ id: number; title: string }> = ({ id, title }) => {
  const { data: history, isSuccess } = useQuery(historyQuery.detail({ id, title }));

  if (!isSuccess) return null;

  return (
    <Container
      title={`${history.title}#${id}`}
      docsType={history.docsType}
      lastModifiedAt={history.versionDocs.thisVersionCreatedAt}
    >
      <main className={styles.container}>
        <Link href={`/user/${history.versionDocs.userId}`} className={styles.author}>
          작성자 · {history.versionDocs.nickName}
        </Link>
        <ul className={styles.historyBox}>
          {history.diff.map((dif: HistoryType, historyId: number) => {
            const operationIcon = (() => {
              switch (dif.operation) {
                case VersionDifferent.INSERT:
                  return "+";
                case VersionDifferent.DELETE:
                  return "-";
                case VersionDifferent.EQUAL:
                  return;
                default:
                  return dif.operation;
              }
            })();
            return (
              <li key={historyId} className={styles.historyContent}>
                <i className={styles.historyOperation[dif.operation]}>{operationIcon}</i>
                <p className={styles.history[dif.operation]}>{dif.text}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </Container>
  );
};

export default HistoryDetail;

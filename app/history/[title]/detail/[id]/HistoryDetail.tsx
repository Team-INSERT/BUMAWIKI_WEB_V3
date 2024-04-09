"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { useSuspenseQuery } from "@tanstack/react-query";
import { historyQuery } from "@/services/history/history.query";
import * as styles from "./style.css";

interface HistoryType {
  operation: string;
  text: string;
}

const HistoryDetail: FC<{ id: number; title: string }> = ({ id, title }) => {
  const { data: history } = useSuspenseQuery(historyQuery.detail({ id: id - 1, title }));

  return (
    <Container
      title={`${history.title}#${id}`}
      docsType={history.docsType}
      lastModifiedAt={history.versionDocs.thisVersionCreatedAt}
    >
      <div className={styles.container}>
        <Link href={`/user/${history.versionDocs.userId}`} className={styles.author}>
          작성자 · {history.versionDocs.nickName}
        </Link>
        <div className={styles.historyBox}>
          {history.diff.map((dif: HistoryType, historyId: number) => {
            const operationIcon = (() => {
              switch (dif.operation) {
                case "INSERT":
                  return "+";
                case "DELETE":
                  return "-";
                case "EQUAL":
                  return "";
                default:
                  return dif.operation;
              }
            })();
            return (
              <div key={historyId} className={styles.historyContent}>
                <div className={styles.historyOperation[dif.operation]}>{operationIcon}</div>
                <div className={styles.history[dif.operation]}>{dif.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default HistoryDetail;

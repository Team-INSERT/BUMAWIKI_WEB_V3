import { HistoryType } from "@/types/history.interface";
import React from "react";
import Link from "next/link";
import { dateText } from "@/utils";
import * as styles from "./style.css";

const History = ({ title, historyList }: { title: string; historyList: Array<HistoryType> }) => {
  return (
    <div className={styles.container}>
      {historyList.map((history) => (
        <Link
          href={`/history/${title}/detail/${history.index}`}
          className={styles.historyBox}
          key={String(history.thisVersionCreatedAt)}
        >
          <div className={styles.hgroup}>
            <h1 className={styles.historyId}>#{history.index + 1}</h1>
            <span className={styles.createdAt}>
              편집일 ·&nbsp;
              {dateText(history.thisVersionCreatedAt)}
            </span>
          </div>
          <span className={styles.author}>작성자 ·&nbsp;{history.nickName}</span>
        </Link>
      ))}
    </div>
  );
};

export default History;

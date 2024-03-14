import { HistoryType } from "@/types/history.interface";
import React from "react";
import Link from "next/link";
import { dateText } from "@/utils";
import * as styles from "./style.css";

const History = ({ title, historyList }: { title: string; historyList: Array<HistoryType> }) => {
  return (
    <div className={styles.container}>
      {historyList.map((history, id) => (
        <div className={styles.historyBox} key={String(history.thisVersionCreatedAt)}>
          <Link href={`/history/${title}/detail/${id}`} className={styles.hgroup}>
            <h1 className={styles.historyId}>#{id}</h1>
            <span className={styles.createdAt}>
              편집일 ·&nbsp;
              {dateText(history.thisVersionCreatedAt)}
            </span>
          </Link>
          <Link href={`/user/${history.userId}`} className={styles.author}>
            작성자 ·&nbsp;{history.nickName}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default History;

import React from "react";
import Link from "next/link";
import * as styles from "./style.css";

interface HistoryType {
  operation: string;
  text: string;
}

interface VersionDocs {
  userId: number;
  nickName: string;
}

const HistoryDetail = ({
  diff,
  versionDocs,
}: {
  diff: Array<HistoryType>;
  versionDocs: VersionDocs;
}) => {
  return (
    <div className={styles.container}>
      <Link href={`/user/${versionDocs.userId}`} className={styles.author}>
        작성자 · {versionDocs.nickName}
      </Link>
      <div className={styles.historyBox}>
        {diff.map((dif, id) => {
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
            <div key={id} className={styles.historyContent}>
              <div className={styles.historyOperation[dif.operation]}>{operationIcon}</div>
              <div className={styles.history[dif.operation]}>{dif.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryDetail;

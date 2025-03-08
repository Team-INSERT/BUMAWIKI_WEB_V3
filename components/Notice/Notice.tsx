"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Link from "next/link";
import * as styles from "./style.css";

const Notice = () => {
  const { data: noticeList, isSuccess } = useQuery(docsQuery.list("notice"));
  const [isListOpen, setIsListOpen] = useState(false);
  const containerStatus = isListOpen ? "open" : "close";

  if (!isSuccess) return null;

  const flatNoticeList = noticeList?.keys.flatMap((key) => noticeList.data[key]);

  const handlePopularListMouseHover = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <aside
      onMouseEnter={handlePopularListMouseHover}
      onMouseLeave={handlePopularListMouseHover}
      className={styles.container[containerStatus]}
    >
      <header className={styles.titleBox}>공지</header>
      <ul className={styles.docsList}>
        {flatNoticeList.slice(0, 5).map((notice) => (
          <Link
            href={`/docs/${notice.title}`}
            className={styles.docsListItem[containerStatus]}
            key={notice.title}
          >
            <span className={styles.docsName}>{notice.title}</span>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Notice;

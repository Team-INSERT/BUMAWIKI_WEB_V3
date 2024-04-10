"use client";

import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Link from "next/link";
import { LikeIcon } from "@/assets";
import * as styles from "./style.css";

const Popular = () => {
  const { data: popularList } = useSuspenseQuery(docsQuery.list("popular"));
  const [isListOpen, setIsListOpen] = useState(false);
  const containerStatus = isListOpen ? "open" : "close";

  const handlePopularListMouseHover = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <aside
      onMouseEnter={handlePopularListMouseHover}
      onMouseLeave={handlePopularListMouseHover}
      className={styles.container[containerStatus]}
    >
      <header className={styles.titleBox}>인기</header>
      <ul className={styles.docsList}>
        {popularList.slice(0, 10).map((popular, index) => (
          <Link
            href={`/docs/${popular.title}`}
            className={styles.docsListItem[containerStatus]}
            key={popular.title}
          >
            <h1 className={styles.ranking}>{index + 1}</h1>
            <span className={styles.docsName}>{popular.title}</span>
            <div className={styles.thumbsUpsCountsBox}>
              <LikeIcon isLike width={14} height={14} />
              <span>{popular.thumbsUpsCounts}</span>
            </div>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Popular;

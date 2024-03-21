"use client";

import React, { Suspense, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Link from "next/link";
import { LikeIcon } from "@/assets";
import * as styles from "./style.css";

const Popular = () => {
  const { data: popularList } = useSuspenseQuery(docsQuery.list("popular"));
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <Suspense>
      <div
        onMouseEnter={() => setIsListOpen((prev) => !prev)}
        onMouseLeave={() => setIsListOpen((prev) => !prev)}
        className={styles.body}
      >
        {isListOpen && (
          <aside className={styles.openContainer}>
            <div className={styles.titleOpenBox}>
              <span className={styles.titleText}>인기</span>
            </div>
            <ul className={styles.docsOpenList}>
              {popularList.map((popular, index) => (
                <Link
                  href={`/docs/${popular.title}`}
                  className={styles.docsOpenListItem}
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
        )}
        <aside className={styles.container}>
          <div className={styles.titleBox}>
            <span className={styles.titleText}>인기</span>
          </div>
          <ul className={styles.docsList}>
            {popularList.slice(0, 10).map((popular, index) => (
              <Link
                href={`/docs/${popular.title}`}
                className={styles.docsListItem}
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
      </div>
    </Suspense>
  );
};

export default Popular;

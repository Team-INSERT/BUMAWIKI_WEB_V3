import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { DocsListItem } from "@/types/docsListItem.interface";
import Link from "next/link";
import { useDocsListQuery } from "@/services/docs/docs.query";
import * as styles from "./style.css";

const Popular = async () => {
  const popularList = await useDocsListQuery({ classify: "popular" });

  return (
    <HydrationBoundary>
      <div className={styles.body}>
        <aside className={styles.container}>
          <div className={styles.titleBox}>
            <span className={styles.titleText}>실시간 인기</span>
          </div>
          <ul className={styles.docsList}>
            {popularList.slice(0, 10).map((popular: DocsListItem, index: number) => (
              <li className={styles.docsListItem} key={popular.title}>
                <h1 className={styles.ranking}>{index + 1}</h1>
                <Link href={`/docs/${popular.title}`} className={styles.docsName}>
                  {popular.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </HydrationBoundary>
  );
};

export default Popular;

"use client";

import { DocsItem } from "@/types/docsItem.interface";
import React from "react";
import "dayjs/locale/ko";
import { decodeContent } from "@/utils";
import DOMPurify from "dompurify";
import Link from "next/link";
import * as styles from "./style.css";

const Docs = ({ docs }: { docs: DocsItem }) => {
  const sanitizeData = () => ({
    __html: DOMPurify.sanitize(decodeContent(docs.contents)),
  });
  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className={styles.body} dangerouslySetInnerHTML={sanitizeData()} />
      <div className={styles.contributorsBox}>
        <h1 className={styles.contributorTitle}>문서 기여자</h1>
        <div className={styles.contributorList}>
          {docs.contributors.map((contributor) => (
            <Link
              key={contributor.id}
              href={`/user/${contributor.id}`}
              className={styles.contributor}
            >
              {contributor.nickName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;

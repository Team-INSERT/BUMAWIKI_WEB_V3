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
      <span className={styles.warning}>
        문의를 통해 본인 문서의 기재되길 원치않는 특정 내용을 즉시 삭제할 수 있습니다.
        <br />
        문서 기재로 발생한 이슈에 대해 부마위키 팀은 아무런 책임을 지지 않으며, 수사 기관에 편집
        기록과 관련된 데이터를 제공할 수 있습니다.
      </span>
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

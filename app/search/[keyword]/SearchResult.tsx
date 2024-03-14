import React from "react";
import { dateText } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { DocsListItem } from "@/types/docsListItem.interface";
import { AxiosError } from "axios";
import * as styles from "./style.css";

interface DocsListProps {
  result: Array<DocsListItem>;
}

const SearchResult = ({ result }: DocsListProps) => {
  console.log(result);

  if (result instanceof AxiosError) {
    return (
      <div className={styles.searchNotFoundBox}>
        <h1 className={styles.searchTitle}>검색 결과가 없습니다.</h1>
        <Link href="/create" className={styles.searchCreateLink}>
          직접 문서를 생성해보세요
        </Link>
      </div>
    );
  }

  return (
    <div>
      {result.map((docs) => (
        <Link href={`/docs/${docs.title}`} key={docs.id} className={styles.container}>
          <div className={styles.docs}>
            <hgroup className={styles.titleBox}>
              <h1 className={styles.title}>{docs.title}</h1>
              <span className={styles.lastModifiedAt}>
                최근 수정일 ·&nbsp;
                {dateText(docs.lastModifiedAt)}
              </span>
            </hgroup>
            <p className={styles.simpleContents}>
              {docs.simpleContents.replace(/<[^>]+>/g, " ")} ...더보기
            </p>
          </div>
          {docs.thumbnail && (
            <Image
              width={170}
              height={90}
              src={docs.thumbnail}
              className={styles.thumbnail}
              alt="thumbnail"
            />
          )}
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;

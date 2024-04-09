"use client";

import { FC } from "react";
import { tagRemover } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import { useRouter } from "next/navigation";
import { theme } from "@/styles";
import { useDate } from "@/hooks/useDate";
import { MoonLoader } from "react-spinners";
import * as styles from "./style.css";

const SearchResult: FC<{ keyword: string }> = ({ keyword }) => {
  const { data: result } = useQuery(docsQuery.keyword(keyword));
  const router = useRouter();
  const { formatDate } = useDate();

  if (!result) {
    return (
      <Container title={`검색결과#${decodeURI(keyword)}`} docsType="user">
        <div className={styles.searchNotFoundBox}>
          <h1 className={styles.searchTitle}>검색 결과가 없습니다.</h1>
          <Link href="/create" className={styles.searchCreateLink}>
            직접 문서를 생성해보세요
          </Link>
        </div>
      </Container>
    );
  }

  if (result.length === 1) {
    router.push(`/docs/${result[0].title}`);
  } else {
    return (
      <Container title={`검색결과#${decodeURI(keyword)}`} docsType="user">
        {result.map((docs) => (
          <Link href={`/docs/${docs.title}`} key={docs.id} className={styles.container}>
            <div className={styles.docs}>
              <hgroup className={styles.titleBox}>
                <h1 className={styles.title}>{docs.title}</h1>
                <span className={styles.lastModifiedAt}>
                  최근 수정일 ·&nbsp;
                  {formatDate(docs.lastModifiedAt)}
                </span>
              </hgroup>
              <p className={styles.simpleContents}>{tagRemover(docs.simpleContents)}</p>
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
      </Container>
    );
  }

  return (
    <div className={styles.loader}>
      <MoonLoader size={40} color={theme.primary} />
    </div>
  );
};

export default SearchResult;

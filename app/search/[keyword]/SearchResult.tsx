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
import { useDate } from "@/hooks";
import { MoonLoader } from "react-spinners";
import * as styles from "./style.css";
import SearchNotFound from "./SearchNotFound";

const SearchResult: FC<{ keyword: string }> = ({ keyword }) => {
  const { data: result } = useQuery(docsQuery.keyword(keyword));
  const router = useRouter();
  const { formatDate } = useDate();

  if (!result) return <SearchNotFound keyword={keyword} />;

  /** 결과값이 한 개면 바로 리다이렉트 */
  if (result.length === 1) {
    router.push(`/docs/${result[0].title}`);
  } else {
    return (
      <Container title={`검색결과#${decodeURI(keyword)}`} docsType="user">
        {result.map((docs) => (
          <Link href={`/docs/${docs.title}`} key={docs.id} className={styles.container}>
            <article className={styles.docs}>
              <hgroup className={styles.titleBox}>
                <h1 className={styles.title}>{docs.title}</h1>
                <time className={styles.lastModifiedAt}>
                  최근 수정일 ·&nbsp;
                  {formatDate(docs.lastModifiedAt)}
                </time>
              </hgroup>
              <p className={styles.simpleContents}>{tagRemover(docs.simpleContents)}</p>
            </article>
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

  /** 로딩 중일 경우 */
  return (
    <div className={styles.loaderBox}>
      <MoonLoader size={40} color={theme.primary} />
    </div>
  );
};

export default SearchResult;

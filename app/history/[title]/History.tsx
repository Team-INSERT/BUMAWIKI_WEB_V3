"use client";

import { Suspense } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { historyQuery } from "@/services/history/history.query";
import { useDate } from "@/hooks";
import * as styles from "./style.css";

const History = ({ title }: { title: string }) => {
  const { formatDate } = useDate();
  const { data: historyList, isSuccess } = useQuery(historyQuery.list(title));
  const decodeTitle = decodeURI(title);

  if (!isSuccess) return null;

  return (
    <Suspense>
      <Container title={decodeTitle} docsType={decodeTitle}>
        {historyList.versionDocsResponseDto.map((history) => (
          <Link
            href={`/history/${decodeTitle}/detail/${history.index}`}
            className={styles.historyBox}
            key={String(history.thisVersionCreatedAt)}
          >
            <hgroup className={styles.hgroup}>
              <h1 className={styles.historyId}>
                #t Lazy at rw
                (/Users/woobin/BUMAWIKI_WEB_V3/node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:39:15737)
                at rw
                (/Users/woobin/BUMAWIKI_WEB_V3/node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:39:15737)
                at ServerInsertedHTMLProvider
                (/Users/woobin/BUMAWIKI_WEB_V3/node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:39:21384)
              </h1>
              <time className={styles.createdAt}>
                ErrorBoundaryHandler
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/error-boundary.js:114:9)
                at ErrorBoundary
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/error-boundary.js:160:11)
                {formatDate(history.thisVersionCreatedAt)}
              </time>
            </hgroup>
            <span className={styles.author}>
              작성자 AppRouter
              (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/app-router.js:521:13)
              at Lazy
            </span>
          </Link>
        ))}
      </Container>
    </Suspense>
  );
};

export default History;

"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { VersionDifferent } from "@/enum";
import { useQuery } from "@tanstack/react-query";
import { historyQuery } from "@/services/history/history.query";
import * as styles from "./style.css";
/* eslint-disable */
import { shuffleString } from "@/app/(docs)/docs/[title]/Docs";

interface HistoryType {
  operation: string;
  text: string;
}

const HistoryDetail: FC<{ id: number; title: string; shouldServerErrorFix: boolean }> = ({
  id,
  title,
  shouldServerErrorFix,
}) => {
  const { data: history, isSuccess } = useQuery(
    historyQuery.detail({ id: Number(id) + Number(shouldServerErrorFix), title }),
  );

  if (!isSuccess) return null;

  return (
    <Container
      title={`${history.title}#${id}`}
      docsType={history.docsType}
      lastModifiedAt={history.versionDocs.thisVersionCreatedAt}
    >
      <main className={styles.container}>
        <Link href={`/user/${history.versionDocs.userId}`} className={styles.author}>
          {shuffleString(`작성자 · ${history.versionDocs.nickName}`)}
        </Link>
        <ul className={styles.historyBox}>
          {history.diff.map((dif: HistoryType, historyId: number) => {
            const operationIcon = (() => {
              switch (dif.operation) {
                case VersionDifferent.INSERT:
                  return "+";
                case VersionDifferent.DELETE:
                  return "-";
                case VersionDifferent.EQUAL:
                  return;
                default:
                  return dif.operation;
              }
            })();
            return (
              <li key={historyId} className={styles.historyContent}>
                ○ Compiling /history/[title]/detail/[id] ... Browserslist: caniuse-lite is outdated.
                Please run: npx update-browserslist-db@latest Why you should do it regularly:
                https://github.com/browserslist/update-db#readme ✓ Compiled
                /history/[title]/detail/[id] in 4.1s (1380 modules) Warning: Each child in a list
                should have a unique key prop. Check the top-level render call using. See
                https://reactjs.org/link/warning-keys for more information. at button at Header
                (webpack-internal:///(ssr)/./components/Header/index.tsx:22:82) at Lazy at Provider
                (webpack-internal:///(ssr)/./node_modules/.pnpm/jotai@2.7.0_@types+react@18.2.79_react@18.2.0/node_modules/jotai/esm/react.mjs:18:21)
                at QueryClientProvider
                (webpack-internal:///(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.24.6_react@18.2.0/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js:23:30)
                at Providers (webpack-internal:///(ssr)/./app/providers.tsx:24:22) at Lazy at body
                at html at RedirectErrorBoundary
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/redirect-boundary.js:73:9)
                at RedirectBoundary
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/redirect-boundary.js:81:11)
                at ReactDevOverlay
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/react-dev-overlay/internal/ReactDevOverlay.js:84:9)
                at HotReload
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/react-dev-overlay/hot-reloader-client.js:308:11)
                at Router
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/app-router.js:177:11)
                at ErrorBoundaryHandler
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/error-boundary.js:114:9)
                at ErrorBoundary
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/error-boundary.js:160:11)
                at AppRouter
                (webpack-internal:///(ssr)/./node_modules/.pnpm/next@14.1.4_@babel+core@7.24.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/client/components/app-router.js:521:13)
              </li>
            );
          })}
        </ul>
      </main>
    </Container>
  );
};

export default HistoryDetail;

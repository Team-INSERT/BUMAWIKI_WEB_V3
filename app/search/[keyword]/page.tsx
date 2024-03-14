import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { useDocsByKeywordQuery } from "@/services/docs/docs.query";
import SearchResult from "./SearchResult";

interface PageProps {
  params: {
    keyword: string;
  };
}

const Page = async ({ params: { keyword } }: PageProps) => {
  const result = await useDocsByKeywordQuery({ keyword }).catch((e) => e);

  return (
    <Container title={`검색결과#${decodeURI(keyword)}`} docsType="user">
      <HydrationBoundary>
        <SearchResult result={result} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

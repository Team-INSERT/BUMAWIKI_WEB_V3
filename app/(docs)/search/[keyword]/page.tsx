import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docsQuery";

interface PageProps {
  params: {
    keyword: string;
  };
}

const Page = async ({ params: { keyword } }: PageProps) => {
  const queryClient = getQueryClient();
  const result = await queryClient.fetchQuery(docsQuery.getByKeyword(keyword));

  return (
    <Container title={`검색결과:${keyword}`} classify="검색결과">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <History docs={docs} /> */}
        {JSON.stringify(result)}
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

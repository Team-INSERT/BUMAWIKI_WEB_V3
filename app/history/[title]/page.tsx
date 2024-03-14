import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { useHistoryListQuery } from "@/services/history/history.query";
import History from "./History";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  const historyList = await useHistoryListQuery({ title });
  const decodedTitle = decodeURI(title);

  return (
    <Container title={decodedTitle} docsType={decodedTitle}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <History title={decodedTitle} historyList={historyList.versionDocsResponseDto} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

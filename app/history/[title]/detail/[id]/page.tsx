import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { useHistoryDetailQuery } from "@/services/history/history.query";
import HistoryDetail from "./HistoryDetail";

interface PageProps {
  params: {
    title: string;
    id: string;
  };
}

const Page = async ({ params: { title, id } }: PageProps) => {
  const queryClient = getQueryClient();
  const history = await useHistoryDetailQuery({ title, id: +id });
  return (
    <Container
      title={`${history.title}#${id}`}
      docsType={history.docsType}
      lastModifiedAt={history.versionDocs.thisVersionCreatedAt}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HistoryDetail {...history} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

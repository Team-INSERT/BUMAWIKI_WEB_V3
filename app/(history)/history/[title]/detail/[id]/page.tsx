import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { historyQuery } from "@/services/history/historyQuery";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  const history = await queryClient.fetchQuery(
    historyQuery.getDetail(title, 0),
  );

  return (
    <Container title={title} classify={title}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <History docs={docs} /> */}
        {JSON.stringify(history)}
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

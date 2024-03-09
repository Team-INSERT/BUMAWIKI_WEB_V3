import Container from "@/components/Container";
import { docsQuery } from "@/services/docs/docsQuery";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import Docs from "./Docs";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  const docs = await queryClient.fetchQuery(docsQuery.getByTitle(title));

  return (
    <Container title={docs.title} classify={docs.docsType}>
      {docs.docsType}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {JSON.stringify(docs)}
        <Docs docs={docs} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

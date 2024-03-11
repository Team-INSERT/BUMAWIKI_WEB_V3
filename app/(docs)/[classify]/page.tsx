import Container from "@/components/Container";
import { useDocs } from "@/hooks/useDocs";
import { docsQuery } from "@/services/docs/docsQuery";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import DocsList from "./DocsList";

interface PageProps {
  params: {
    classify: string;
  };
}

const Page = async ({ params: { classify } }: PageProps) => {
  const { translateClassify } = useDocs();
  const queryClient = getQueryClient();
  const docsList = await queryClient.fetchQuery(docsQuery.getList(classify));

  return (
    <Container title={translateClassify(classify)} classify={classify}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DocsList docsList={docsList} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

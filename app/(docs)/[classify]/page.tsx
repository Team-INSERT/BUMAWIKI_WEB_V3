import Container from "@/components/Container";
import { useDocs } from "@/hooks/useDocs";
import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { useDocsListQuery } from "@/services/docs/docs.query";
import DocsList from "./DocsList";

interface PageProps {
  params: {
    classify: string;
  };
}

const Page = async ({ params: { classify } }: PageProps) => {
  const { translateClassify } = useDocs();
  const docsList = await useDocsListQuery({ classify });

  return (
    <Container title={translateClassify(classify)} docsType={classify}>
      <HydrationBoundary>
        <DocsList docsList={docsList} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { useDocsByTitleQuery } from "@/services/docs/docs.query";
import Docs from "./Docs";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const docs = await useDocsByTitleQuery({ title });

  return (
    <Container {...docs}>
      <HydrationBoundary>
        <Docs docs={docs} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

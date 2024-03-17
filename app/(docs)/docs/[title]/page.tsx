import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { useDocsByTitleQuery } from "@/services/docs/docs.query";
import getQueryClient from "@/app/getQueryClient";
import Docs from "./Docs";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  const docs = await useDocsByTitleQuery({ title });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container {...docs}>
        <Docs docs={docs} />
      </Container>
    </HydrationBoundary>
  );
};

export default Page;

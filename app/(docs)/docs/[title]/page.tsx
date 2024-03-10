import Container from "@/components/Container";
import { docsQuery } from "@/services/docs/docsQuery";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import Link from "next/link";
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
      <Link
        href={`/history/${title}`}
        style={{
          width: "fit-content",
          padding: "20px",
          color: "white",
          background: "green",
        }}
      >
        버전
      </Link>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Docs docs={docs} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { historyQuery } from "@/services/history/historyQuery";
import Link from "next/link";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  const historyList = await queryClient.fetchQuery(historyQuery.getList(title));

  return (
    <Container title={title} classify={title}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Link
          href={`/history/${title}/detail/0`}
          style={{
            width: "fit-content",
            padding: "20px",
            color: "white",
            background: "green",
          }}
        >
          버전디텔
        </Link>
        {/* <History docs={docs} /> */}
        {JSON.stringify(historyList)}
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

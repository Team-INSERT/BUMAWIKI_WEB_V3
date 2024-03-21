import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import { likeQuery } from "@/services/like/like.query";
import { Metadata } from "next";
import { generateOpenGraph } from "@/utils";
import Docs from "./Docs";

interface PageProps {
  params: {
    title: string;
  };
}

export const generateMetadata = async ({ params: { title } }: PageProps): Promise<Metadata> => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(docsQuery.title(title));

  return generateOpenGraph({
    title: data.title,
    description: data.contents,
  });
};

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  Promise.all([
    await queryClient.prefetchQuery(docsQuery.title(title)),
    await queryClient.prefetchQuery(likeQuery.likeCount(title)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Docs title={title} />
    </HydrationBoundary>
  );
};

export default Page;

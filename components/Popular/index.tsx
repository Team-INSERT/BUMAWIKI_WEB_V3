import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import Popular from "./Popular";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.list("popular"));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Popular />
    </HydrationBoundary>
  );
};

export default Page;

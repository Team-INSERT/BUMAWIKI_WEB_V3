import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import Aside from "./Aside";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.lastModified(0));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Aside />
    </HydrationBoundary>
  );
};

export default Page;

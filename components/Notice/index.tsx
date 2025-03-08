import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import Notice from "./Notice";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.list("notice"));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notice />
    </HydrationBoundary>
  );
};

export default Page;

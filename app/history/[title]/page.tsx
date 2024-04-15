import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { historyQuery } from "@/services/history/history.query";
import { Metadata } from "next";
import { generateOpenGraph } from "@/utils";
import History from "./History";

interface PageProps {
  params: {
    title: string;
  };
}

export const generateMetadata = async ({ params: { title } }: PageProps): Promise<Metadata> => {
  const decodedTitle = decodeURI(title);
  return generateOpenGraph({
    title: `역사#${decodedTitle}`,
    description: `${decodedTitle} 문서의 역사입니다.`,
  });
};

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(historyQuery.list(title));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <History title={title} />
    </HydrationBoundary>
  );
};

export default Page;

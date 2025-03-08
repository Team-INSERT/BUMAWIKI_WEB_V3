import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { historyQuery } from "@/services/history/history.query";
import { generateOpenGraph } from "@/utils";
import { Metadata } from "next";
import HistoryDetail from "./HistoryDetail";

interface PageProps {
  params: {
    title: string;
    id: number;
  };
}

export const generateMetadata = async ({ params: { title, id } }: PageProps): Promise<Metadata> => {
  const decodedTitle = decodeURI(title);
  return generateOpenGraph({
    title: `역사#${decodedTitle}_${id}`,
    description: `${decodedTitle} 문서의 ${id}번째 역사입니다.`,
  });
};

const Page = async ({ params }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(historyQuery.detail(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HistoryDetail {...params} />
    </HydrationBoundary>
  );
};

export default Page;

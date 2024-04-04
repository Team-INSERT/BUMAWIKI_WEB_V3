import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import { generateOpenGraph } from "@/utils";
import { Metadata } from "next";
import SearchResult from "./SearchResult";

interface PageProps {
  params: {
    keyword: string;
  };
}

export const generateMetadata = async ({ params: { keyword } }: PageProps): Promise<Metadata> => {
  return generateOpenGraph({
    title: `검색 결과#${decodeURI(keyword)}`,
    description: `부마위키의 "${decodeURI(keyword)}" 검색 결과입니다.`,
  });
};

const Page = async ({ params: { keyword } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.keyword(keyword));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchResult keyword={keyword} />
    </HydrationBoundary>
  );
};

export default Page;

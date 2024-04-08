import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import { generateOpenGraph } from "@/utils";
import { Metadata } from "next";
import { CLASSIFY } from "@/record/docsType.record";
import DocsList from "./DocsList";

interface PageProps {
  params: {
    classify: string;
  };
}

export const generateMetadata = async ({ params: { classify } }: PageProps): Promise<Metadata> => {
  return generateOpenGraph({
    title: CLASSIFY[classify],
    description: `교내의 ${CLASSIFY[classify]}들을 모아둔 페이지입니다.`,
  });
};

const Page = async ({ params: { classify } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.list(classify));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocsList classify={classify} />
    </HydrationBoundary>
  );
};

export default Page;

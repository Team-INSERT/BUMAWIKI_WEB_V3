import getQueryClient from "@/app/getQueryClient";
import EditorContainer from "@/components/Editor";
import { docsQuery } from "@/services/docs/docs.query";
import { generateOpenGraph } from "@/utils";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

interface PageProps {
  params: {
    title: string;
  };
}

export const generateMetadata = async ({ params: { title } }: PageProps): Promise<Metadata> => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(docsQuery.title(title));

  return generateOpenGraph({
    title: `문서 편집#${data.title}`,
    description: `${data.title} 문서 편집 페이지입니다.`,
  });
};

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.title(title));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditorContainer title={title} mode="EDIT" />
    </HydrationBoundary>
  );
};

export default Page;

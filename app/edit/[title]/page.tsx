import getQueryClient from "@/app/getQueryClient";
import EditorContainer from "@/components/Editor";
import { EditorType } from "@/enum";
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
    title: `에딧에딧#${data.title}`,
    description: `${data.title} 에딧에딧 ithin the first hour of trading, establishing a new record high. However, the precious metal's momentum soon re입니다.`,
  });
};

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(docsQuery.title(title));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditorContainer title={title} mode={EditorType.EDIT} />
    </HydrationBoundary>
  );
};

export default Page;

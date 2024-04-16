import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import { likeQuery } from "@/services/like/like.query";
import { Metadata } from "next";
import { generateOpenGraph } from "@/utils";
import { notFound } from "next/navigation";
import Docs from "./Docs";

interface PageProps {
  params: {
    title: string;
  };
}

export const generateMetadata = async ({ params: { title } }: PageProps): Promise<Metadata> => {
  try {
    const queryClient = getQueryClient();
    const data = await queryClient.fetchQuery(docsQuery.title(title));
    return generateOpenGraph({
      title: data.title,
      description: data.contents,
    });
  } catch {
    // prefetch 단계에서 오류가 발생했다면 해당 문서는 Not Found
    notFound();
  }
};

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  Promise.all([
    await queryClient.prefetchQuery(docsQuery.title(title)),
    await queryClient.prefetchQuery(likeQuery.likeCount(title)),
  ]);
  /**
   * contents에서 frame list를 얻기 위해 값을 반환하는 fetchQuery 사용
   * include();와 match되는 글자 탐색
   * "include();" 삭제 (틀 이름만 남을 수 있도록)
   */
  const { contents } = await queryClient.fetchQuery(docsQuery.title(title));
  const matchesFrameFormatList = contents.match(/include\((.*?)\);/g) || [];
  const frameList = matchesFrameFormatList.map((match) => match.replace(/include\(|\);/g, ""));
  await Promise.all(frameList.map((frame) => queryClient.prefetchQuery(docsQuery.title(frame))));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Docs title={title} frameNameList={frameList} />
    </HydrationBoundary>
  );
};

export default Page;

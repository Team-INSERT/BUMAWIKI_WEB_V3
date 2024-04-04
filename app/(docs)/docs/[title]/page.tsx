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
    notFound();
  }
};

const Page = async ({ params: { title } }: PageProps) => {
  const queryClient = getQueryClient();
  Promise.all([
    await queryClient.prefetchQuery(docsQuery.title(title)),
    await queryClient.prefetchQuery(likeQuery.likeCount(title)),
  ]);

  const data = await queryClient.fetchQuery(docsQuery.title(title));

  const frameList: string[] = [];
  const frames = Array.from(data.contents.matchAll(/include\((.+)\);/g));
  frames.forEach((frame) => {
    if (!frameList.includes(frame[1])) {
      frameList.push(frame[1]);
    }
  });

  await Promise.all(
    frameList.map((frameTitle) => queryClient.prefetchQuery(docsQuery.title(frameTitle))),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Docs title={title} list={frameList} />
    </HydrationBoundary>
  );
};

export default Page;

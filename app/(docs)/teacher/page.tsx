import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { docsQuery } from "@/services/docs/docs.query";
import { generateOpenGraph } from "@/utils";
import DocsList from "../[classify]/DocsList";

export const metadata = generateOpenGraph({
  title: "선생님",
  description: `교내의 선생님들을 모아둔 페이지입니다.`,
});

const Page = async () => {
  const queryClient = getQueryClient();
  Promise.all([
    await queryClient.prefetchQuery(docsQuery.list("teacher")),
    await queryClient.prefetchQuery(docsQuery.list("major_teacher")),
    await queryClient.prefetchQuery(docsQuery.list("mentor_teacher")),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {["teacher", "major_teacher", "mentor_teacher"].map((classify) => (
        <DocsList classify={classify} key={classify} />
      ))}
    </HydrationBoundary>
  );
};

export default Page;

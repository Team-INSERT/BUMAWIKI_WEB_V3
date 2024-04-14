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
  Promise.all(
    teacherClassifyList.map((docsType) => queryClient.prefetchQuery(docsQuery.list(docsType))),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {teacherClassifyList.map((classify) => (
        <DocsList classify={classify} key={classify} />
      ))}
    </HydrationBoundary>
  );
};

const teacherClassifyList = ["teacher", "major_teacher", "mentor_teacher"];

export default Page;

import React, { Suspense } from "react";
import { generateOpenGraph } from "@/utils";
import OAuth from "./OAuth";

export const metadata = generateOpenGraph({
  title: "로그인",
  description: "부마위키 로그인 페이지입니다.",
});

const Page = () => {
  return (
    <Suspense>
      <OAuth />
    </Suspense>
  );
};

export default Page;

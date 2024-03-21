import React from "react";
import { generateOpenGraph } from "@/utils";
import MyPage from "./MyPage";

export const metadata = generateOpenGraph({
  title: "마이페이지",
  description: "부마위키의 마이페이지입니다.",
});

const Page = () => {
  return <MyPage />;
};

export default Page;

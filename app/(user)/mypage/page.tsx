"use client";

import Container from "@/components/Container";
import { useMyInformationQuery } from "@/services/user/user.query";
import React from "react";
import Link from "next/link";
import { link } from "../style.css";
import MyPage from "./MyPage";

const Page = () => {
  const { isSuccess, data } = useMyInformationQuery();

  return (
    <Container title="마이페이지" docsType="mypage">
      {isSuccess ? (
        <MyPage user={data} />
      ) : (
        <Link className={link} href={process.env.NEXT_PUBLIC_OAUTH_URL || ""}>
          로그인 후 이용해주세요.
        </Link>
      )}
    </Container>
  );
};

export default Page;

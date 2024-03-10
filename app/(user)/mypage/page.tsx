"use client";

import Container from "@/components/Container";
import React from "react";
import { useUserService } from "@/services/user/useUserService";

const Page = () => {
  const { isSuccess, data } = useUserService();

  return (
    <Container title="마이페이지" classify="유저">
      {isSuccess && JSON.stringify(data)}
    </Container>
  );
};

export default Page;

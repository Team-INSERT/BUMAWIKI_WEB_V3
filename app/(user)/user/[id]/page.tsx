import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { useUserByIdQuery } from "@/services/user/user.query";
import User from "./User";

interface PageProps {
  params: {
    id: number;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  const user = await useUserByIdQuery({ id });

  return (
    <Container title={user.nickName} docsType="user">
      <HydrationBoundary>
        <User user={user} />
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

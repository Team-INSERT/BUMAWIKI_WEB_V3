import Container from "@/components/Container";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { userQuery } from "@/services/user/userQuery";

interface PageProps {
  params: {
    id: number;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  const queryClient = getQueryClient();
  const user = await queryClient.fetchQuery(userQuery.getUser(id));

  return (
    <Container title={user.nickName} classify="유저">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {JSON.stringify(user)}
      </HydrationBoundary>
    </Container>
  );
};

export default Page;

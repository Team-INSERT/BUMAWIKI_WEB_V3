import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { userQuery } from "@/services/user/user.query";
import { Metadata } from "next";
import { generateOpenGraph, translateAuthority } from "@/utils";
import User from "./User";

interface PageProps {
  params: {
    id: number;
  };
}

export const generateMetadata = async ({ params: { id } }: PageProps): Promise<Metadata> => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(userQuery.id(id));

  return generateOpenGraph({
    title: data.nickName,
    description: `부마위키 - ${data.nickName} (${translateAuthority(data.authority)})`,
  });
};

const Page = async ({ params: { id } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(userQuery.id(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <User id={id} />
    </HydrationBoundary>
  );
};

export default Page;

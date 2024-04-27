import React from "react";
import { docsQuery } from "@/services/docs/docs.query";
import getQueryClient from "@/app/getQueryClient";
import Resolver from "./resolver";

interface Props {
  title: string;
  contents: string;
}

const ResolverContainer = ({ title, contents }: Props) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(docsQuery.conflicted(title, contents));

  return <Resolver title={title} contents={contents} />;
};

export default ResolverContainer;

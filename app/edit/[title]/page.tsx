import Editor from "@/components/Editor";
import { useDocsByTitleQuery } from "@/services/docs/docs.query";
import React from "react";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const docs = await useDocsByTitleQuery({ title });
  return (
    <div>
      <Editor {...docs} mode="EDIT" />
    </div>
  );
};

export default Page;

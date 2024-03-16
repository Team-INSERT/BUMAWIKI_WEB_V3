import Editor from "@/components/Editor";
import { useDocsByTitleQuery } from "@/services/docs/docs.query";
import React from "react";

interface PageProps {
  params: {
    title: string;
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const doc = await useDocsByTitleQuery({ title });
  return (
    <div>
      <Editor content={doc.contents} title={doc.title} isEdit />
    </div>
  );
};

export default Page;

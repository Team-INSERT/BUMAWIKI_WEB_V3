"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Editor from "./Editor";

type EditMode = { mode: "EDIT"; title: string };
type CreateMode = { mode: "CREATE"; title?: undefined };

const EditorContainer: FC<EditMode | CreateMode> = ({ title, mode }) => {
  const { data, isSuccess } = useQuery({
    ...docsQuery.title(title as string),
    enabled: mode === "EDIT",
  });
  const docs = isSuccess ? { ...data } : { title: "", contents: "", docsType: "", version: 0 };

  return <Editor {...docs} mode={mode} />;
};

export default EditorContainer;

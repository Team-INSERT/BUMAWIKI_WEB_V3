"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import { EditorType } from "@/enum";
import Editor from "./Editor";

type EditMode = { mode: EditorType.EDIT; title: string };
type CreateMode = { mode: EditorType.CREATE; title: undefined };

const EditorContainer: FC<EditMode | CreateMode> = ({ title, mode }) => {
  const { data, isSuccess } = useQuery({
    ...docsQuery.title(title as string),
    enabled: mode === EditorType.EDIT,
  });
  const docs = isSuccess ? data : { title: "", contents: "", docsType: "" };

  return <Editor {...docs} mode={mode} />;
};

export default EditorContainer;

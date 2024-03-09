import { useMutation } from "@tanstack/react-query";
import { docsQuery } from "./docsQuery";

export const useCreateDocs = () => {
  return useMutation(docsQuery.create());
};

export const useUpdateDocs = (title: string) => {
  return useMutation(docsQuery.update(title));
};

export const useUpdateDocsTitle = (title: string, titleToChange: string) => {
  return useMutation(docsQuery.updateTitle(title, titleToChange));
};

export const useRemoveDocs = (id: number) => {
  return useMutation(docsQuery.remove(id));
};

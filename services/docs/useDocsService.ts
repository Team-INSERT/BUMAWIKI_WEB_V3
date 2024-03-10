import { useMutation, useQuery } from "@tanstack/react-query";
import { docsQuery } from "./docsQuery";

export const useDocsList = ({ classify }: { classify: string }) => {
  return useQuery(docsQuery.getList(classify));
};

export const useDocs = ({ title }: { title: string }) => {
  return useQuery(docsQuery.getByTitle(title));
};

export const useLastModified = (page: number) => {
  return useQuery(docsQuery.getLastModifiedAt(page));
};

export const useSearch = ({ keyword }: { keyword: string }) => {
  return useQuery(docsQuery.getByKeyword(keyword));
};

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

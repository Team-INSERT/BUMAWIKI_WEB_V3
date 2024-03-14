import getQueryClient from "@/app/getQueryClient";
import { useQuery } from "@tanstack/react-query";
import {
  getDocsByKeyword,
  getDocsByTitle,
  getDocsListByClassify,
  getLastModifiedDocsList,
} from "./docs.api";
import { DOCS } from "./docs.key";

export const useDocsListQuery = ({ classify }: { classify: string }) => {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    queryKey: DOCS.LIST(classify),
    queryFn: () => getDocsListByClassify(classify),
  });
};

export const useDocsByTitleQuery = ({ title }: { title: string }) => {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    queryKey: DOCS.TITLE(title),
    queryFn: () => getDocsByTitle(title),
  });
};

export const useDocsByKeywordQuery = ({ keyword }: { keyword: string }) => {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    queryKey: DOCS.KEYWORD(keyword),
    queryFn: () => getDocsByKeyword(keyword),
  });
};

export const useLastModifiedDocsListQuery = (page: number) => {
  return useQuery({
    queryKey: DOCS.LASTMODIFY,
    queryFn: () => getLastModifiedDocsList(page),
  });
};

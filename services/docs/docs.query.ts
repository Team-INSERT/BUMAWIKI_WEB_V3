import { queryOptions } from "@tanstack/react-query";
import { DocsListType } from "@/types/docsList.interface";
import { DocsItem } from "@/types/docsItem.interface";
import { DocsListItem } from "@/types/docsListItem.interface";
import {
  getConflictByTitle,
  getDocsByKeyword,
  getDocsByTitle,
  getDocsListByClassify,
  getLastModifiedDocsList,
} from "./docs.api";

type QueryOptions<Classify extends string> = Classify extends "popular"
  ? Array<DocsListItem>
  : DocsListType;

export const docsQuery = {
  list: <Classify extends string>(classify: Classify) =>
    queryOptions<QueryOptions<Classify>>({
      queryKey: ["query.docsList", classify],
      queryFn: () => getDocsListByClassify(classify),
    }),
  title: <Title extends string>(title: Title) =>
    queryOptions<DocsItem>({
      queryKey: ["query.docsTitle", title],
      queryFn: () => getDocsByTitle(title),
    }),
  keyword: <Keyword extends string>(keyword: Keyword) =>
    queryOptions<Array<DocsListItem>>({
      queryKey: ["query.docsKeyword", keyword],
      queryFn: () => getDocsByKeyword(keyword),
    }),
  lastModified: <Page extends number>(page: Page) =>
    queryOptions({
      queryKey: ["query.lastModifiedAt", page],
      queryFn: () => getLastModifiedDocsList(page),
    }),
  conflicted: <Title extends string>(title: Title, contents: string) =>
    queryOptions({
      queryKey: ["query.conflicted", title],
      queryFn: () => getConflictByTitle(title, contents),
    }),
};

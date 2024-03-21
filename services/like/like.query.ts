import { queryOptions } from "@tanstack/react-query";
import { getDocsLikeCount, getIsILike } from "./like.api";

export const likeQuery = {
  likeCount: <Title extends string>(title: Title) =>
    queryOptions({
      queryKey: ["query.like", title],
      queryFn: () => getDocsLikeCount(title),
    }),
  isILike: <Id extends number>(id: Id) =>
    queryOptions({
      queryKey: ["query.isILike", id],
      queryFn: () => getIsILike(id),
    }),
};

import { queryOptions } from "@tanstack/react-query";
import { getMyInformation, getMyLikeList, getUserById } from "./user.api";

export const userQuery = {
  my: () =>
    queryOptions({
      queryKey: ["query.my"],
      queryFn: getMyInformation,
    }),
  id: <Id extends number>(id: Id) =>
    queryOptions({
      queryKey: ["query.user", id],
      queryFn: () => getUserById(id),
    }),
  like: () =>
    queryOptions({
      queryKey: ["query.userLike"],
      queryFn: getMyLikeList,
    }),
};

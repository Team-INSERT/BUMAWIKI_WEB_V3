import { queryOptions } from "@tanstack/react-query";
import { getMyInformation, getMyLikeList, getUserById, getUserList } from "./user.api";

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
  list: () =>
    queryOptions({
      queryKey: ["query.userList"],
      queryFn: getUserList,
    }),
};

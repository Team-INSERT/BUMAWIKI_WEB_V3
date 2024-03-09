import UserService from "./UserService";

const queryKeys = {
  mypage: ["mypage"] as const,
  user: (id: number) => ["user", id] as const,
};

export const userQuery = {
  getMyInfo: () => ({
    queryKey: queryKeys.mypage,
    queryFn: () => UserService.getMyInfo().then((r) => r.data),
  }),

  getUser: (id: number) => ({
    queryKey: queryKeys.user(id),
    queryFn: () => UserService.getUser(id).then((r) => r.data),
  }),
};

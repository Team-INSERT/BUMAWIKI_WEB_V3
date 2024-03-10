import { useQuery } from "@tanstack/react-query";
import { userQuery } from "./userQuery";

export const useUserService = () => {
  return useQuery(userQuery.getMyInfo());
};

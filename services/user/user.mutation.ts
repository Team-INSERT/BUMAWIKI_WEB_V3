import { useMutation } from "@tanstack/react-query";
import { requestChangeAuthorityUser } from "./user.api";

export const useChangeUserAuthorityMutation = () => {
  return useMutation({
    mutationFn: requestChangeAuthorityUser,
  });
};

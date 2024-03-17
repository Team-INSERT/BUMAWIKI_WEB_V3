import { useMutation } from "@tanstack/react-query";
import { Storage } from "@/storage";
import { TOKEN } from "@/constants/token.constant";
import { requestLogin, requestLogout } from "./auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: requestLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      // window.history.go(-2);
      window.location.href = "/";
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: requestLogout,
    onSuccess: () => {
      window.location.reload();
    },
    onSettled: () => {
      Storage.delItem(TOKEN.ACCESS);
      Storage.delItem(TOKEN.REFRESH);
    },
  });
};

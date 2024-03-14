import { http } from "@/apis";
import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";

export const requestLogin = async (authCode: string) => {
  const { data } = await http.post("/auth/oauth/bsm", null, { headers: { authCode } });
  return data;
};

export const requestLogout = async () => {
  const { data } = await http.delete("/auth/bsm/logout", {
    headers: { RefreshToken: Storage.getItem(TOKEN.REFRESH) },
  });
  return data;
};

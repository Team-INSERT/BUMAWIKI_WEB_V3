import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";

export const authorization = () => ({
  headers: {
    Authorization: Storage.getItem(TOKEN.ACCESS),
  },
});

export const refreshToken = () => ({
  headers: {
    RefreshToken: Storage.getItem(TOKEN.REFRESH),
  },
});

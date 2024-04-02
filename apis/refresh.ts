import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const refresh = async () => {
  const { data } = await instance.put("/auth/refresh/access", null, {
    headers: { RefreshToken: `${Storage.getItem(TOKEN.REFRESH)}` },
  });
  Storage.setItem(TOKEN.ACCESS, data.accessToken);
  return data.accessToken;
};

export default refresh;

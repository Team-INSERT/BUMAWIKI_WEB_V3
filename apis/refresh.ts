import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const refresh = async () => {
  try {
    const { data } = await instance.put("/auth/refresh/access", null, {
      headers: { RefreshToken: `${Storage.getItem(TOKEN.REFRESH)}` },
    });
    Storage.setItem(TOKEN.ACCESS, data.accessToken);
    return data.accessToken;
  } catch (err) {
    Storage.clear();
  }
};

export default refresh;

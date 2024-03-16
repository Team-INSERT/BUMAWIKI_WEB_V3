import { http } from "@/apis";
import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";

export const getMyInformation = async () => {
  const { data } = await http.get("/user", {
    headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
  });
  return data;
};

export const getUserById = async (id: number) => {
  const { data } = await http.get(`/user/id/${id}`);
  return data;
};

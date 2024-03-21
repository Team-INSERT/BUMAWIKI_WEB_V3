import { http } from "@/apis";
import { authorization } from "@/apis/header";

export const getMyInformation = async () => {
  const { data } = await http.get("/user", authorization());
  return data;
};

export const getUserById = async (id: number) => {
  const { data } = await http.get(`/user/id/${id}`);
  return data;
};

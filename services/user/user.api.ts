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

export const getMyLikeList = async () => {
  const { data } = await http.get("/thumbs/up/get", authorization());
  return data;
};

export const getUserList = async () => {
  const { data } = await http.get("/users", authorization());
  return data;
};

export const requestChangeAuthorityUser = async ({
  email,
  authority,
}: {
  email: string;
  authority: string;
}) => {
  const { data } = await http.put(`/set/authority`, { email, authority }, authorization());
  return data;
};

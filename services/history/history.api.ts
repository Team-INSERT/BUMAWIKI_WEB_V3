import { http } from "@/apis";

export const getHistoryList = async (title: string) => {
  const { data } = await http.get(`/docs/find/${title}/version`);
  return data;
};

export const getHistoryDetail = async (title: string, id: number) => {
  const { data } = await http.get(`/docs/find/version/${title}/different/${id}`);
  return data;
};

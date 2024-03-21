import { http } from "@/apis";
import { authorization } from "@/apis/header";

export const getDocsLikeCount = async (title: string) => {
  const { data } = await http.get(`/docs/thumbs/up/get/${title}`);
  return data;
};

export const getIsILike = async (id: number) => {
  const { data } = await http.get(`/docs/like/${id}`, authorization());
  return data;
};

export const requestCreateLike = async (docsId: number) => {
  const { data } = await http.post("/thumbs/up/create", { docsId }, authorization());
  return data;
};
export const requestDeleteLike = async (docsId: number) => {
  const { data } = await http.delete("/thumbs/up/delete", {
    ...authorization(),
    data: { docsId },
  });
  return data;
};

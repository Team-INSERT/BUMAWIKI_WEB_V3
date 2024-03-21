import { http } from "@/apis";
import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";

export const getDocsLikeCount = async (title: string) => {
  const { data } = await http.get(`/docs/thumbs/up/get/${title}`);
  return data;
};

export const getIsILike = async (id: number) => {
  const { data } = await http.get(`/docs/like/${id}`, {
    headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
  });
  return data;
};

export const requestCreateLike = async (docsId: number) => {
  const { data } = await http.post(
    "/thumbs/up/create",
    { docsId },
    {
      headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
    },
  );
  return data;
};
export const requestDeleteLike = async (docsId: number) => {
  const { data } = await http.delete("/thumbs/up/delete", {
    headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
    data: { docsId },
  });
  return data;
};

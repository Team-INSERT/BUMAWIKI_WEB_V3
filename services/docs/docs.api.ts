import { http } from "@/apis";
import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";
import { CreateDocsType } from "@/types/createDocsType.interface";

export const getDocsListByClassify = async (classify: string) => {
  const { data } = await http.get(`/docs/${classify}`);
  return data;
};

export const getDocsByTitle = async (title: string) => {
  const { data } = await http.get(`/docs/find/title/${title}`);
  return data;
};

export const getDocsByKeyword = async (keyword: string) => {
  const { data } = await http.get(`/docs/find/all/title/${keyword}`);
  return data;
};

export const getLastModifiedDocsList = async (page: number) => {
  const { data } = await http.get("/docs/find/modified", { params: { page } });
  return data;
};

export const requestCreateDocs = async (docs: CreateDocsType) => {
  const { data } = await http.post("/docs/create", docs, {
    headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
  });
  return data;
};

export const requestUpdateDocs = async (title: string) => {
  const { data } = await http.post(`/docs/update/${title}`, {});
  return data;
};

export const requestDeleteDocs = async (id: number) => {
  const { data } = await http.delete(`/docs/delete/${id}`, {
    headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
  });
  return data;
};

export const requestUploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await http.post("/s3", formData);
  return data;
};

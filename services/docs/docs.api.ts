import { http } from "@/apis";
import { authorization } from "@/apis/header";
import { CreateDocsType } from "@/types";

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
  const { data } = await http.post("/docs/create", docs, authorization());
  return data;
};

export const requestUpdateDocs = async ({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) => {
  const { data } = await http.put(`/docs/update/${title}`, { contents }, authorization());
  return data;
};

export const requestUpdateNameDocs = async ({
  legacyTitle,
  title,
}: {
  legacyTitle: string;
  title: string;
}) => {
  const { data } = await http.put(`/docs/update/title/${legacyTitle}`, { title }, authorization());
  return data;
};

export const requestDeleteDocs = async (id: number) => {
  const { data } = await http.delete(`/docs/delete/${id}`, authorization());
  return data;
};

export const requestUploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await http.post("/s3", formData);
  return data;
};

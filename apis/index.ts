import axios from "axios";
import { exception } from "@/constants/exception.constant";
import refresh from "./refresh";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { code } = error.response.data;

    if (code?.includes(exception.code.TOKEN_403_2) && !originalRequest.isLooping) {
      originalRequest.isLooping = true;
      originalRequest.headers.Authorization = await refresh();
      return http(originalRequest);
    }
    return Promise.reject(error);
  },
);

http.interceptors.request.use(async (requestConfig) => {
  const urlParams = requestConfig.url?.split("/:") || [];
  if (urlParams.length < 2) return requestConfig;

  const paramParsedUrl = urlParams?.map((paramKey) => requestConfig.params[paramKey]).join("/");

  urlParams?.forEach((paramKey: string) => {
    delete requestConfig.params[paramKey];
  }, {});

  return {
    ...requestConfig,
    url: paramParsedUrl,
  };
});

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
    const request = error.config;
    const { code } = error.response.data;
    const isAccessTokenExpiredError = code === exception.code.TOKEN_403_2;

    if (isAccessTokenExpiredError && !request.sent) {
      request.sent = true;
      request.headers.Authorization = await refresh();
      return http(request);
    }
    return Promise.reject(error);
  },
);

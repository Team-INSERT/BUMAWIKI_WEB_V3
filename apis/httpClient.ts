import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { exception } from "@/constants/exception.constant";
import { Storage } from "@/storage";
import { TOKEN } from "@/constants/token.constant";
import config from "@/config";
import { requestInterceptors, responseInterceptors } from "./interceptors";
import refresh from "./refresh";

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: { Authorization?: string };
}

export class HttpClient {
  private api: AxiosInstance;

  private static clientConfig: HttpClientConfig;

  constructor(url: string) {
    const axiosConfig: HttpClientConfig = {
      baseURL: config.baseURL,
      timeout: 10000,
    };

    this.api = axios.create({
      ...axiosConfig,
      baseURL: `${axiosConfig.baseURL}${url}`,
    });
    HttpClient.clientConfig = { headers: { Authorization: "" } };
    this.setting();
  }

  get(url: string, requestConfig?: AxiosRequestConfig) {
    return this.api.get(url, { ...HttpClient.clientConfig, ...requestConfig });
  }

  post(url: string, data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.post(url, data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  put(url: string, data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.put(url, data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  delete(url: string, requestConfig?: AxiosRequestConfig) {
    return this.api.delete(url, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  private setting() {
    HttpClient.setCommonInterceptors(this.api);

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.data.code === exception.code.TOKEN_403_2 &&
          !originalRequest.isAlreadyRetry
        ) {
          originalRequest.isAlreadyRetry = true;
          await refresh();
          return this.api(originalRequest);
        }

        return Promise.reject(error);
      },
    );
  }

  static setAccessToken() {
    const accessToken = Storage.getItem(TOKEN.ACCESS);
    HttpClient.clientConfig.headers = {
      ...HttpClient.clientConfig.headers,
      Authorization: accessToken ?? undefined,
    };
  }

  static removeAccessToken() {
    Storage.setItem(TOKEN.ACCESS, "");
  }

  private static setCommonInterceptors(instance: AxiosInstance) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.interceptors.request.use(requestInterceptors as any);
    instance.interceptors.response.use(responseInterceptors);
  }
}

export default {};

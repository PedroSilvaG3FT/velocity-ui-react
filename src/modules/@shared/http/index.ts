import store from "@/store";
import axios, { AxiosRequestHeaders } from "axios";

const axiosFactory = (baseURL: string = "", headers?: AxiosRequestHeaders) =>
  axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      ...headers,
    },
  });

export const httpClient = axiosFactory(import.meta.env.VITE_API_URL);

httpClient.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  const { token, tokenType } = store.getState().auth;
  if (token) config.headers["Authorization"] = `${tokenType} ${token}`;

  return config;
});

import axios, { AxiosInstance } from "axios";
import { getSessionToken } from "../libraries/session-manager";

export const httpClient = (): AxiosInstance => {
  const token = getSessionToken();

  return axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 3000,
    headers: { Authorization: `Bearer ${token}` },
  });
};

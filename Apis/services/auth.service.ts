import { ApiResponse, AuthData } from "../../types";
import { httpClient } from "../client";

import { urls } from "../urls";

export async function login(data: AuthData): Promise<ApiResponse<any>> {
  const response = await httpClient().post(urls.auth.login, data);
  return response.data;
}

export async function signup(data: AuthData): Promise<ApiResponse<any>> {
  const response = await httpClient().post(urls.auth.signup, data);
  return response.data;
}

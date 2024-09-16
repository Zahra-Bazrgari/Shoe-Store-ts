import { urls } from "../urls";
import { httpClient } from "../client";
import { ApiResponse } from "../../types";

export async function getUserInfo(): Promise<ApiResponse<any>> {
  const response = await httpClient().get(urls.user);
  return response.data;
}

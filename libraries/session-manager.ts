import { tokenName } from "./constants";

export const setSessionToken = (token: string): void => {
  localStorage.setItem(tokenName, token);
};

export const getSessionToken = (): string | null => {
  return localStorage.getItem(tokenName);
};

export const removeSessionToken = (): void => {
  localStorage.removeItem(tokenName);
};

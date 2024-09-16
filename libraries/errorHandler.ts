import { AxiosError } from "axios";
import { toast } from "./toast";
import { removeSessionToken } from "./session-manager";

export const errorHandler = (error: AxiosError): void => {
  const message = error.response?.data?.message;
  if (typeof message === "string") {
    toast(message);
  } else if (Array.isArray(message)) {
    message.forEach((msgText) => toast(msgText));
  }

  const statusCode = Number(error.response?.data?.statusCode || 0);
  if (statusCode === 403) {
    toast("Please login again");
    removeSessionToken();
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  }
};

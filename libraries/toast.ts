import Toast from typescript-toastify;
import "toastify-js/src/toastify.css";

export const toast = (text: string, mode: "success" | "error" = "error"): void => {
  Toast({
    text,
    duration: 3000,
    close: true,
    style: {
      background: mode === "success" ? "green" : "red",
      fontSize: "18px",
      fontWeight: "600",
      borderRadius: "10px",
    },
  }).showToast();
};

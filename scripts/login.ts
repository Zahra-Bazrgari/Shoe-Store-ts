import "../style.css";
import { login } from "../Apis/services/auth.service";
import { errorHandler } from "../libraries/errorHandler";
import { setSessionToken } from "../libraries/session-manager";
import { AuthData } from "../types";

document.querySelector(".vector")?.addEventListener("click", () => {
  window.location.href = "index.html";
});

const togglePassword = document.getElementById('togglePassword') as HTMLElement;
const passwordInput = document.getElementById('Password') as HTMLInputElement;

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

const loginForm = document.getElementById("login-inputs") as HTMLFormElement;

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const usernameInput = (event.currentTarget as HTMLFormElement).elements.namedItem("userName") as HTMLInputElement;
  const passwordInput = (event.currentTarget as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;

  try {
    const data: AuthData = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const response = await login(data);
    console.log(response);
    setSessionToken(response.token);
    window.location.href = "/home.html";

  } catch (error) {
    // errorHandler(error as Error);
  }
});

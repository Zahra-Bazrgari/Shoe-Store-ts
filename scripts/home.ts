import "../style.css";
import "swiper/css";
import { getUserInfo } from "../Apis/services/user.service";
import { errorHandler } from "../libraries/errorHandler";
import { urls } from "../Apis/urls";
import axios from "axios";
import { getSessionToken } from "../libraries/session-manager";
import { Sneaker } from "../types";

let selectedBrand: string | null = null;
let allSneakers: Sneaker[] = [];
let debounceTimeout: number | null = null;

async function main(): Promise<void> {
  try {
    const response = await getUserInfo();
    console.log("User Info: ", response);
  } catch (error) {
    console.error("Error fetching user info: ", error);
    // errorHandler(error as Error);
  }
}

async function displayGreeting(): Promise<void> {
  const greetingElement = document.getElementById("greeting") as HTMLElement;
  const userNameElement = document.querySelector(".username") as HTMLElement;

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good night";
  }

  if (greetingElement) {
    greetingElement.textContent = `${greeting} 👋`;
  }

  try {
    const response = await getUserInfo();
    const userName = response.username;
    if (userNameElement) {
      userNameElement.textContent = `${userName}!`;
    }
  } catch (error) {
    if (userNameElement) {
      userNameElement.textContent = "Hello, Guest!";
    }
  }
}

async function fetchSneakers(page = 1, limit = 100): Promise<void> {
  const sessionToken = getSessionToken();
  const url = `http://localhost:3000/sneaker?page=${page}&limit=${limit}`;

  try {
    const response = await axios({
      method: "get",
      url: url,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    if (response.data && Array.isArray(response.data.data)) {
      allSneakers = response.data.data;
    } else {
      console.error("Invalid sneaker data structure:", response.data);
      allSneakers = [];
    }

    generateBrandButtons();
    renderSneakers(1, 10);
  } catch (error) {
    console.error("Error fetching sneakers: ", error);
    // errorHandler(error as Error);
  }
}




function generateBrandButtons(): void {
  const container = document.getElementById("brandContainer") as HTMLElement;
  if (!container) return;

  container.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = "px-4 py-2 rounded-full bg-black text-white no-wrap";
  allButton.innerText = "All";
  allButton.addEventListener("click", () =>
    handleBrandSelection(allButton, null)
  );
  container.appendChild(allButton);

  const uniqueBrands = [
    ...new Set(allSneakers.map((sneaker) => sneaker.brand)),
  ];

  uniqueBrands.forEach((brand) => {
    const button = document.createElement("button");
    button.className =
      "text-nowrap px-4 py-2 rounded-full border border-gray-300 text-gray-700 no-wrap";
    button.innerText = brand;
    button.addEventListener("click", () => handleBrandSelection(button, brand));
    container.appendChild(button);
  });
}

function handleBrandSelection(button: HTMLElement, brand: string | null): void {
  const buttons = document.querySelectorAll("#brandContainer button");
  buttons.forEach(
    (btn) =>
      (btn.className =
        "text-nowrap px-4 py-2 rounded-full border border-gray-300 text-gray-700 no-wrap")
  );

  button.className =
    "text-nowrap no-wrap px-4 py-2 rounded-full bg-black text-white";

  selectedBrand = brand;
  renderSneakers(1, 10);
}

function renderSneakers(page = 1, limit = 10): void {
  const cardContainer = document.querySelector(
    ".card-container"
  ) as HTMLElement;
  if (!cardContainer) return;

  cardContainer.innerHTML = "";

  const filteredSneakers = selectedBrand
    ? allSneakers.filter((sneaker) => sneaker.brand === selectedBrand)
    : allSneakers;
  const totalSneakers = filteredSneakers.length;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sneakersToDisplay = filteredSneakers.slice(startIndex, endIndex);

  sneakersToDisplay.forEach((sneaker) => {
    const card = document.createElement("div");
    card.className =
      "no-wrap card flex flex-col items-start bg-white p-1 rounded-lg";
    card.innerHTML = `
            <img src="${sneaker.imageURL}" alt="${
      sneaker.name
    }" class="rounded-lg mb-4 w-full max-h-48">
      <h2 class="text-lg font-semibold truncate max-w-full">${sneaker.name}</h2>
      <p class="text-gray-500">$${sneaker.price.toFixed(2)}</p>
    `;

    card.addEventListener("click", () => navigateToDetailsPage(sneaker.id));

    cardContainer.appendChild(card);
  });

  togglePagination(totalSneakers > limit);
  createPagination(totalSneakers, page, limit);
}

function createPagination(
  totalItems: number,
  currentPage = 1,
  limit = 10
): void {
  const paginationContainer = document.querySelector(
    "#pagination"
  ) as HTMLElement;
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / limit);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = `px-4 py-2 rounded-full ${
      i === currentPage ? "bg-black text-white" : "bg-white text-black"
    }`;
    button.innerText = i.toString();

    button.addEventListener("click", () => {
      renderSneakers(i, limit);
    });

    paginationContainer.appendChild(button);
  }
}

function searchSneakers(item: string): void {
  const filteredSneakers = allSneakers.filter(
    (sneaker) =>
      sneaker.name.toLowerCase().includes(item.toLowerCase()) ||
      sneaker.brand.toLowerCase().includes(item.toLowerCase())
  );

  const cardContainer = document.querySelector(
    ".card-container"
  ) as HTMLElement;
  if (!cardContainer) return;

  cardContainer.innerHTML = "";

  if (filteredSneakers.length > 0) {
    filteredSneakers.forEach((sneaker) => {
      const card = document.createElement("div");
      card.className =
        "no-wrap card flex flex-col items-start bg-white p-1 rounded-lg";
      card.innerHTML = `
        <img src="${sneaker.imageURL}" alt="${
        sneaker.name
      }" class="rounded-lg mb-4 w-full max-h-48">
        <h2 class="text-lg font-semibold truncate max-w-full">${
          sneaker.name
        }</h2>
        <p class="text-gray-500">$${sneaker.price.toFixed(2)}</p>
      `;

      card.addEventListener("click", () => navigateToDetailsPage(sneaker.id));

      cardContainer.appendChild(card);
    });
  } else {
    const noResults = document.createElement("div");
    noResults.className =
      "w-screen flex flex-col justify-center items-center text-center";
    noResults.innerHTML = `
        <img src="pictures/Screenshot 2024-09-03 023813.png" alt="Not Found">
        <p class="font-bold">Not Found</p>
        <p>Sorry, the keyword you entered cannot be found. Please check again or search with another keyword.</p>
    `;
    cardContainer.appendChild(noResults);
  }

  togglePagination(false);
}

function togglePagination(show: boolean): void {
  const paginationContainer = document.querySelector(
    "#pagination"
  ) as HTMLElement;
  if (paginationContainer) {
    paginationContainer.style.display = show ? "block" : "none";
  }
}

function handleSearch(event: InputEvent): void {
  const input = event.target as HTMLInputElement;
  const query = input.value.trim();

  if (debounceTimeout !== null) clearTimeout(debounceTimeout);

  debounceTimeout = window.setTimeout(() => {
    searchSneakers(query);
  }, 1500);
}

function navigateToDetailsPage(sneakerId: string): void {
  window.location.href = `/sneakers.html?sneakerId=${sneakerId}`;
}

document.getElementById("search-box")?.addEventListener("input", handleSearch);

document.addEventListener("DOMContentLoaded", () => {
  main();
  displayGreeting();
  fetchSneakers();
});

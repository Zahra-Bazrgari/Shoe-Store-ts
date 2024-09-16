import "../style.css";
import { getSessionToken } from "../libraries/session-manager";
import axios from "axios";
import { Sneaker } from "../types";

const urlParams = new URLSearchParams(window.location.search);
const sneakerId = urlParams.get("sneakerId");

async function fetchSneakerDetails(sneakerId: string): Promise<void> {
  const sessionToken = getSessionToken();

  try {
    const response = await axios.get<{ data: Sneaker }>(
      `http://localhost:3000/sneaker/item/${sneakerId}`,
      {
        headers: { Authorization: `Bearer ${sessionToken}` },
      }
    );

    if (response.data) {
      displaySneakerDetails(response.data.data);
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching sneaker details:", (error as Error).message);
  }
}

function displaySneakerDetails(sneaker: Sneaker): void {
  const photoContainer = document.getElementById("sneakerPicture") as HTMLElement;
  const nameContainer = document.getElementById("nameContainer") as HTMLElement;
  const sizeContainer = document.getElementById("size") as HTMLElement;
  const colorContainer = document.getElementById("color") as HTMLElement;
  const priceContainer = document.getElementById("price") as HTMLElement;

  photoContainer.innerHTML = `
    <img src="${sneaker.imageURL}" alt="${sneaker.name}" class="w-full mb-3 rounded-md">`;

  nameContainer.innerHTML = `
    <h2 class="text-2xl font-bold">${sneaker.name}</h2>`;

  // sizeContainer.innerHTML = sneaker.sizes?.map(size => `
  //   <button class="size-option border border-gray-300 px-3 py-1 rounded text-sm ${size === sneaker.sizes[0] ? "border-black font-bold" : ""} hover:border-black hover:font-bold">${size}</button>
  // `).join("") || "";

  // colorContainer.innerHTML = sneaker.colors?.map(color => `
  //   <div class="color-option w-8 h-8 rounded-full border border-gray-300" style="background-color: ${color};"></div>
  // `).join("") || "";

  priceContainer.innerText = `$${sneaker.price.toFixed(2)}`;
}

let quantity = 0;
const quantityDisplay = document.getElementById("quantity") as HTMLElement;

document.querySelectorAll(".quantity-btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.textContent === "+") {
      quantity++;
    } else if (this.textContent === "-" && quantity > 0) {
      quantity--;
    }
    quantityDisplay.textContent = quantity.toString();
  });
});

document.getElementById("toggleButton")?.addEventListener("click", function (event) {
  event.preventDefault();

  const descriptionText = document.getElementById("descriptionText") as HTMLElement;
  const toggleButton = document.getElementById("toggleButton") as HTMLElement;

  if (descriptionText.classList.contains("h-10")) {
    descriptionText.classList.remove("h-10", "overflow-hidden");
    descriptionText.classList.add("h-auto");
    toggleButton.textContent = "view less..";
  } else {
    descriptionText.classList.remove("h-auto");
    descriptionText.classList.add("h-10", "overflow-hidden");
    toggleButton.textContent = "view more..";
  }
});


if (sneakerId) {
  fetchSneakerDetails(sneakerId);
}

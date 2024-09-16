import "./style.css";
import Swiper, { SwiperOptions } from "swiper";
import "swiper/css";


const swiperElement = document.querySelector(".swiper") as HTMLElement | null;
if (!swiperElement) {
  throw new Error("Swiper element not found.");
}

const swiperConfig: SwiperOptions = {
  slidesPerView: "auto",
  loop: false,
  on: {
    slideChange: function () {
      updatePagination(swiper.activeIndex);
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
};

const swiper = new Swiper(swiperElement, swiperConfig);

function updatePagination(activeIndex: number): void {
  const sliderIcons = document.querySelectorAll('.btm-sliders .slider-icon');

  sliderIcons.forEach((icon, index) => {
    if (index === activeIndex) {
      icon.classList.remove('bg-gray-300');
      icon.classList.add('bg-[#212529]');
    } else {
      icon.classList.remove('bg-[#212529]');
      icon.classList.add('bg-gray-300');
    }
  });
}

const sliderIcons = document.querySelectorAll('.btm-sliders .slider-icon');
sliderIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    swiper.slideTo(index, 500, false);
  });
});

updatePagination(0);

document.querySelectorAll('.nextButton').forEach(button => {
  button.addEventListener('click', () => {
    swiper.slideNext();
  });
});

document.querySelector(".getStarted")?.addEventListener("click", () => {
  window.location.href = "login.html";
});

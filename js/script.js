// Add navbar background on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "#141414";
  } else {
    navbar.style.background =
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)";
  }
});

// Add this new code to your existing JavaScript
const menuBtn = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");
let isMenuOpen = false;

// Toggle menu function
menuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  navLinks.classList.toggle("active");

  // Optional: Prevent body scrolling when menu is open
  document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    isMenuOpen
  ) {
    isMenuOpen = false;
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Slider functionality
const sliderContainer = document.querySelector(".slider-container");
const thumbnailsContainer = document.querySelector(".thumbnails");
const prevButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");
const thumbnailWidth = 210; // 200px width + 10px gap
let isDragging = false;
let startX;
let scrollLeft;

// Button controls
prevButton.addEventListener("click", () => {
  thumbnailsContainer.scrollLeft -= thumbnailWidth * 4;
});

nextButton.addEventListener("click", () => {
  thumbnailsContainer.scrollLeft += thumbnailWidth * 4;
});

// Mouse drag functionality
thumbnailsContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - sliderContainer.offsetLeft;
  scrollLeft = thumbnailsContainer.scrollLeft;
});

thumbnailsContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});

thumbnailsContainer.addEventListener("mouseup", () => {
  isDragging = false;
});

thumbnailsContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - sliderContainer.offsetLeft;
  const walk = (x - startX) * 2;
  thumbnailsContainer.scrollLeft = scrollLeft - walk;
});

// Touch functionality
thumbnailsContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - sliderContainer.offsetLeft;
  scrollLeft = thumbnailsContainer.scrollLeft;
});

thumbnailsContainer.addEventListener("touchend", () => {
  isDragging = false;
});

thumbnailsContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - sliderContainer.offsetLeft;
  const walk = (x - startX) * 2;
  thumbnailsContainer.scrollLeft = scrollLeft - walk;
});

// Handle thumbnail clicks for hero update
const thumbnails = document.querySelectorAll(".thumbnail");
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const heroTitle = document.querySelector(".hero-title");
const heroDescription = document.querySelector(".hero-description");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    if (!isDragging) {
      // Only update hero if not dragging
      heroContent.classList.add("fade");

      setTimeout(() => {
        hero.style.background = `
            linear-gradient(to top, #141414, transparent),
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent),
            url('${this.src}') center/cover
          `;

        heroContent.classList.remove("fade");
      }, 300);
    }
  });
});

// Add this new code for play button functionality
document.querySelector(".btn-play").addEventListener("click", function () {
  window.location.href = "player.html";
});

import { products } from "./data/products.js";
import { createProductCard } from "./components/product-card.js";

const catalogGrid = document.querySelector("[data-catalog-grid]");
const yearNode = document.querySelector("[data-year]");

if (catalogGrid) {
  products.forEach((product) => {
    catalogGrid.appendChild(createProductCard(product));
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll(".reveal");

if (sections.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = "0ms";
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  sections.forEach((element) => observer.observe(element));
}

import { products } from "./data/products.js";
import { createProductCard } from "./components/product-card.js";

const catalogGrid = document.querySelector("[data-catalog-grid]");
const yearNode = document.querySelector("[data-year]");
const subscribeForm = document.querySelector("[data-subscribe-form]");
const subscribeStatus = document.querySelector("[data-subscribe-status]");

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

if (subscribeForm && subscribeStatus) {
  const submitButton = subscribeForm.querySelector('button[type="submit"]');

  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(subscribeForm);
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      subscribeStatus.textContent = "Completa tu correo para continuar.";
      subscribeStatus.dataset.state = "error";
      return;
    }

    submitButton.disabled = true;
    subscribeStatus.textContent = "Procesando suscripcion...";
    subscribeStatus.dataset.state = "loading";

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseText = await response.text();
      let payload = null;

      if (responseText) {
        try {
          payload = JSON.parse(responseText);
        } catch {
          payload = { error: responseText };
        }
      }

      if (!response.ok) {
        throw new Error(payload?.error || `No se pudo completar la suscripcion (${response.status}).`);
      }

      subscribeForm.reset();
      subscribeStatus.textContent = payload?.message || "Suscripcion completada. Revisa tu correo.";
      subscribeStatus.dataset.state = "success";
    } catch (error) {
      subscribeStatus.textContent = error instanceof Error ? error.message : "No se pudo completar la suscripcion.";
      subscribeStatus.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
    }
  });
}

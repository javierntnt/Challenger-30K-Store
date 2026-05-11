export function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card reveal";

  const badge = product.highlighted ? "Destacado" : "Catalogo";

  card.innerHTML = `
    <div class="product-card__media">
      <img src="${product.image}" alt="${product.name} sabor ${product.flavor}" loading="lazy" />
    </div>
    <div class="product-card__body">
      <div class="product-card__meta">
        <span class="pill">${badge}</span>
        <span class="product-card__price">$${product.price}</span>
      </div>
      <div>
        <h3>${product.name}</h3>
        <p>${product.flavor} · ${product.puffs}</p>
      </div>
      <p>${product.description}</p>
      <div class="product-card__actions">
        <a class="button button--primary" href="#footer">Pedir ahora</a>
      </div>
    </div>
  `;

  return card;
}

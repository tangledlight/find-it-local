import {
  getCatalog,
  getProductBySlug,
  getStore,
  searchCatalog,
  updateMockAvailability,
} from "./catalogAdapter.js";

const app = document.querySelector("#main-content");
const store = getStore();
let query = "";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const isLocalDevelopment = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
const developmentMode = isLocalDevelopment && new URLSearchParams(window.location.search).get("dev") === "1";

const statusIcon = (code) => ({ IN_STOCK: "●", LOW_STOCK: "◐", OUT_OF_STOCK: "○" }[code]);

const productArt = (product) => `
  <div class="product-art art-${product.category.toLowerCase().replace(/[^a-z]+/g, "-")}" aria-hidden="true">
    <span>${product.name.split(",")[0].split(" ").slice(-1)}</span>
  </div>`;

const status = (availability) => `
  <p class="availability availability-${availability.code.toLowerCase()}">
    <span aria-hidden="true">${statusIcon(availability.code)}</span>
    <span>${availability.label}</span>
  </p>`;

const updated = (availability) => `<p class="updated">Updated ${date.format(new Date(availability.updatedAt))}</p>`;

const storeDetails = () => `
  <aside class="store-details" aria-label="Store details">
    <p class="eyebrow">Find it nearby</p>
    <h2>${store.name}</h2>
    <p>${store.neighborhood}</p>
    <address>${store.address}</address>
    <a href="tel:+17185550198">${store.phone}</a>
    <p>${store.hours}<br><span class="subtle">${store.hoursNote}</span></p>
  </aside>`;

const inventoryNote = () => `<p class="inventory-note">Availability is a helpful guide, not a guarantee—please check before you head over.</p>`;

const renderSimulator = () => {
  if (!developmentMode) return "";
  const options = getCatalog().map((product) => `<option value="${product.id}">${product.name}</option>`).join("");
  return `
    <section class="simulator" aria-labelledby="simulator-heading">
      <p class="eyebrow">Development only</p>
      <h2 id="simulator-heading">Mock inventory simulator</h2>
      <p>Changes local mock inventory only. Shoppers never see this control in a production build.</p>
      <form id="simulator-form">
        <label>Product <select name="product">${options}</select></label>
        <label>Availability
          <select name="availability">
            <option value="IN_STOCK">In stock</option>
            <option value="LOW_STOCK">Low stock</option>
            <option value="OUT_OF_STOCK">Out of stock</option>
          </select>
        </label>
        <button type="submit">Apply local update</button>
      </form>
      <p id="simulator-result" class="subtle" aria-live="polite"></p>
    </section>`;
};

const bindSimulator = () => {
  const form = document.querySelector("#simulator-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const product = updateMockAvailability(values.get("product"), values.get("availability"));
    renderRoute();
    const result = document.querySelector("#simulator-result");
    if (result) result.textContent = `${product.name} is now ${product.availability.label}.`;
  });
};

const renderCatalog = () => {
  const products = searchCatalog(query);
  const cards = products.map((product) => `
    <li class="product-card ${product.availability.code === "OUT_OF_STOCK" ? "is-unavailable" : ""}">
      <a href="#product/${product.slug}" aria-label="View ${product.name}">
        ${productArt(product)}
        <p class="category">${product.category}</p>
        <h2>${product.name}</h2>
        <p class="price">${money.format(product.priceCents / 100)}</p>
        ${status(product.availability)}
        ${updated(product.availability)}
      </a>
    </li>`).join("");

  app.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Williamsburg, Brooklyn</p>
        <h1>Good picnic plans start close to home.</h1>
        <p>Search Wburg Corner’s fictional shelves for the practical things that make gathering outside easy.</p>
      </div>
      ${storeDetails()}
    </section>
    <section class="catalog" aria-labelledby="catalog-heading">
      <div class="catalog-heading">
        <div>
          <p class="eyebrow">Mocked store inventory</p>
          <h2 id="catalog-heading">What’s on the shelf</h2>
        </div>
        <form class="search-form" role="search">
          <label for="search">Search the shop</label>
          <div class="search-control">
            <input id="search" name="search" type="search" autocomplete="off" placeholder="Try “rope,” “plates,” or “picnic blanket”" value="${query}" />
            <button type="button" class="clear-search" ${query ? "" : "hidden"}>Clear</button>
          </div>
        </form>
      </div>
      ${query ? `<p class="result-summary" aria-live="polite">${products.length} match${products.length === 1 ? "" : "es"} for “${query}”</p>` : ""}
      ${products.length ? `<ul class="product-grid">${cards}</ul>` : `
        <div class="empty-state">
          <p class="eyebrow">No matches yet</p>
          <h2>Try a different word.</h2>
          <p>Search by a product, category, or picnic need—like rope, tableware, or cooler.</p>
          <button type="button" class="clear-search">Show all store items</button>
        </div>`}
      ${inventoryNote()}
    </section>
    ${renderSimulator()}`;

  const search = document.querySelector("#search");
  search.addEventListener("input", (event) => {
    query = event.target.value;
    renderCatalog();
    document.querySelector("#search").focus();
  });
  document.querySelectorAll(".clear-search").forEach((button) => button.addEventListener("click", () => {
    query = "";
    renderCatalog();
    document.querySelector("#search").focus();
  }));
  bindSimulator();
};

const renderDetail = (slug) => {
  const product = getProductBySlug(slug);
  if (!product) {
    app.innerHTML = `
      <section class="not-found">
        <p class="eyebrow">That item moved on</p>
        <h1>We couldn’t find that product.</h1>
        <p>Try browsing the mocked Wburg Corner catalog instead.</p>
        <a class="button-link" href="#catalog">Browse the catalog</a>
      </section>`;
    return;
  }

  app.innerHTML = `
    <a class="back-link" href="#catalog">← Back to all items</a>
    <section class="product-detail">
      ${productArt(product)}
      <div class="detail-copy">
        <p class="category">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="detail-price">${money.format(product.priceCents / 100)}</p>
        ${status(product.availability)}
        ${updated(product.availability)}
        <p class="description">${product.description}</p>
        ${inventoryNote()}
      </div>
    </section>
    <section class="detail-store">${storeDetails()}</section>
    ${renderSimulator()}`;
  bindSimulator();
};

const renderRoute = () => {
  const [route, slug] = window.location.hash.slice(1).split("/");
  if (route === "product") renderDetail(slug);
  else renderCatalog();
};

window.addEventListener("hashchange", renderRoute);
renderRoute();

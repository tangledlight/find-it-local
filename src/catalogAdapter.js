import { RAW_CATALOG, RAW_LOCATION } from "./catalogFixture.js";

const statusCopy = {
  IN_STOCK: "In stock",
  LOW_STOCK: "Low stock",
  OUT_OF_STOCK: "Out of stock",
};

let inventoryUpdates = new Map();

const slugify = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const productFromRaw = (raw) => {
  const item = raw.catalogObject.itemData;
  const variation = item.variations[0];
  const override = inventoryUpdates.get(raw.id);
  const inventory = override ?? raw.inventory;

  return {
    id: raw.id,
    slug: slugify(item.name),
    name: item.name,
    category: item.categoryName,
    description: item.description,
    priceCents: variation.itemVariationData.priceMoney.amount,
    currency: variation.itemVariationData.priceMoney.currency,
    availability: {
      code: inventory.availability,
      label: statusCopy[inventory.availability],
      updatedAt: inventory.updatedAt,
    },
    searchTerms: item.searchTerms,
  };
};

export const getStore = () => ({ ...RAW_LOCATION });

export const getCatalog = () => RAW_CATALOG.map(productFromRaw);

export const getProductBySlug = (slug) => getCatalog().find((product) => product.slug === slug) ?? null;

export const searchCatalog = (query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getCatalog();
  return getCatalog().filter((product) => [
    product.name,
    product.category,
    ...product.searchTerms,
  ].some((field) => field.toLowerCase().includes(normalized)));
};

export const updateMockAvailability = (id, availability) => {
  if (!statusCopy[availability]) throw new Error(`Unknown availability: ${availability}`);
  const raw = RAW_CATALOG.find((entry) => entry.id === id);
  if (!raw) throw new Error(`Unknown product: ${id}`);
  inventoryUpdates.set(id, {
    ...raw.inventory,
    availability,
    quantity: availability === "OUT_OF_STOCK" ? 0 : raw.inventory.quantity,
    updatedAt: new Date().toISOString(),
  });
  return getCatalog().find((product) => product.id === id);
};

export const resetMockInventory = () => {
  inventoryUpdates = new Map();
};

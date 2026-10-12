import test from "node:test";
import assert from "node:assert/strict";
import {
  getCatalog,
  getProductBySlug,
  resetMockInventory,
  searchCatalog,
  updateMockAvailability,
} from "../src/catalogAdapter.js";

test("the adapter provides the complete mocked catalog", () => {
  assert.equal(getCatalog().length, 35);
  assert.equal(getCatalog().every((product) => product.availability.label), true);
});

test("shopper search finds seeded product terms, categories, and relevant picnic words", () => {
  assert.equal(searchCatalog("rope").some((product) => product.name === "Jute rope, 25 ft"), true);
  assert.equal(searchCatalog("plates").some((product) => product.name === "Enamel dinner plate, cream"), true);
  assert.equal(searchCatalog("picnic blanket").length, 2);
  assert.equal(searchCatalog("tableware").length, 5);
});

test("out-of-stock products remain searchable", () => {
  const results = searchCatalog("tongs");
  assert.equal(results.length, 1);
  assert.equal(results[0].availability.label, "Out of stock");
});

test("a mock inventory update is reflected by both catalog and product lookup", () => {
  const original = getCatalog().find((product) => product.id === "JUTE_ROPE");
  updateMockAvailability("JUTE_ROPE", "OUT_OF_STOCK");
  assert.equal(searchCatalog("rope").find((product) => product.id === "JUTE_ROPE").availability.label, "Out of stock");
  assert.equal(getProductBySlug(original.slug).availability.label, "Out of stock");
  resetMockInventory();
  assert.equal(getProductBySlug(original.slug).availability.label, "In stock");
});

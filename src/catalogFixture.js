// Raw fictional records deliberately resemble the catalog + inventory concepts
// returned by Square. UI code must use catalogAdapter.js instead of this file.
export const RAW_LOCATION = {
  id: "LOC_WBURG_CORNER",
  name: "Wburg Corner",
  neighborhood: "Williamsburg, Brooklyn",
  address: "127 Driggs Avenue, Williamsburg, Brooklyn, NY 11222",
  phone: "(718) 555-0198",
  hours: "Every day, 10 AM–7 PM",
  hoursNote: "Fictional prototype hours",
};

const updatedAt = "2026-10-12T12:00:00-04:00";

const product = (id, name, category, cents, status, quantity, terms) => ({
  type: "CATALOG_OBJECT",
  id,
  catalogObject: {
    type: "ITEM",
    itemData: {
      name,
      categoryName: category,
      description: `A practical ${name.toLowerCase()} for easy outdoor gathering.`,
      variations: [{
        type: "ITEM_VARIATION",
        id: `${id}_VARIATION`,
        itemVariationData: { priceMoney: { amount: cents, currency: "USD" } },
      }],
      searchTerms: terms,
    },
  },
  inventory: {
    catalogObjectId: `${id}_VARIATION`,
    locationId: "LOC_WBURG_CORNER",
    quantity,
    availability: status,
    updatedAt,
  },
});

export const RAW_CATALOG = [
  product("PICNIC_BLANKET_SAGE", "Waterproof picnic blanket, sage", "Picnic essentials", 4800, "IN_STOCK", 8, ["picnic blanket", "blanket", "outdoors", "waterproof"]),
  product("PICNIC_BLANKET_RED", "Cotton picnic blanket, red stripe", "Picnic essentials", 4200, "OUT_OF_STOCK", 0, ["picnic blanket", "blanket", "cotton"]),
  product("MARKET_BASKET", "Woven market basket", "Picnic essentials", 3600, "IN_STOCK", 7, ["basket", "picnic", "market"]),
  product("COOLER_TOTE", "Insulated cooler tote, navy", "Picnic essentials", 3800, "LOW_STOCK", 2, ["cooler", "tote", "picnic"]),
  product("ICE_PACK", "Reusable ice pack set", "Picnic essentials", 1400, "IN_STOCK", 12, ["ice", "cooler", "picnic"]),
  product("DINNER_PLATE", "Enamel dinner plate, cream", "Tableware", 1200, "IN_STOCK", 14, ["plate", "plates", "picnic", "enamel"]),
  product("BOWL_COBALT", "Enamel bowl, cobalt", "Tableware", 1000, "IN_STOCK", 10, ["bowl", "bowls", "picnic", "enamel"]),
  product("TUMBLER", "Stainless steel tumbler", "Tableware", 1600, "LOW_STOCK", 2, ["cup", "drink", "tumbler"]),
  product("CUTLERY", "Bamboo cutlery set", "Tableware", 1800, "IN_STOCK", 9, ["fork", "knife", "spoon", "picnic"]),
  product("TONGS", "Bamboo serving tongs", "Tableware", 1100, "OUT_OF_STOCK", 0, ["tongs", "serving", "food"]),
  product("NAPKINS", "Linen napkin set, terracotta", "Table linens", 2800, "IN_STOCK", 6, ["napkin", "napkins", "picnic"]),
  product("TABLECLOTH_YELLOW", "Cotton tablecloth, yellow gingham", "Table linens", 3400, "IN_STOCK", 5, ["tablecloth", "gingham", "picnic"]),
  product("TABLECLOTH_BLUE", "Cotton tablecloth, blue stripe", "Table linens", 3400, "OUT_OF_STOCK", 0, ["tablecloth", "stripe", "picnic"]),
  product("BEESWAX_WRAP", "Reusable beeswax wrap set", "Food storage", 2000, "IN_STOCK", 11, ["wrap", "food", "storage"]),
  product("FOOD_CONTAINER", "Glass food container, medium", "Food storage", 1800, "IN_STOCK", 9, ["container", "food", "storage"]),
  product("BOTTLE_CARRIER", "Canvas bottle carrier", "Food storage", 2200, "LOW_STOCK", 2, ["bottle", "wine", "carrier"]),
  product("BOTTLE_OPENER", "Wood-handled bottle opener", "Hosting", 1400, "IN_STOCK", 8, ["opener", "bottle", "hosting"]),
  product("SERVING_TRAY", "Melamine serving tray, green", "Hosting", 2600, "IN_STOCK", 5, ["tray", "serving", "hosting"]),
  product("BUD_VASE", "Ceramic bud vase, coral", "Hosting", 2400, "OUT_OF_STOCK", 0, ["vase", "flowers", "hosting"]),
  product("TAPER_CANDLES", "Taper candle set, cream", "Hosting", 1600, "IN_STOCK", 10, ["candle", "candles", "hosting"]),
  product("CANDLEHOLDER", "Brass candleholder", "Hosting", 2200, "LOW_STOCK", 2, ["candle", "holder", "hosting"]),
  product("MATCH_BOTTLE", "Safety match bottle", "Hosting", 1200, "IN_STOCK", 7, ["matches", "candle", "hosting"]),
  product("CITRONELLA", "Citronella candle, orange", "Outdoors", 1800, "IN_STOCK", 9, ["candle", "mosquito", "outdoors"]),
  product("INCENSE", "Mosquito-repellent incense", "Outdoors", 1400, "IN_STOCK", 8, ["mosquito", "bug", "outdoors"]),
  product("LANTERN", "Portable LED lantern", "Outdoors", 3000, "LOW_STOCK", 2, ["lantern", "light", "outdoors"]),
  product("JUTE_ROPE", "Jute rope, 25 ft", "Utility goods", 1200, "IN_STOCK", 13, ["rope", "string", "jute", "picnic"]),
  product("COTTON_TWINE", "Cotton twine, 200 ft", "Utility goods", 900, "IN_STOCK", 12, ["twine", "string", "rope"]),
  product("UTILITY_STRING", "Utility string, natural", "Utility goods", 700, "IN_STOCK", 15, ["string", "rope", "twine"]),
  product("CLOTHESPINS", "Wooden clothespin set", "Utility goods", 800, "IN_STOCK", 10, ["clothespin", "clips", "utility"]),
  product("SCISSORS", "Mini scissors, red", "Utility goods", 1000, "IN_STOCK", 7, ["scissors", "utility", "craft"]),
  product("UTILITY_KNIFE", "Folding utility knife", "Utility goods", 1800, "OUT_OF_STOCK", 0, ["knife", "utility", "tool"]),
  product("CANVAS_TOTE", "Reusable canvas tote", "Everyday carry", 2000, "IN_STOCK", 10, ["tote", "bag", "carry"]),
  product("NOTEBOOK", "Pocket notebook, green", "Everyday carry", 800, "IN_STOCK", 14, ["notebook", "paper", "carry"]),
  product("MARKER", "Permanent marker, black", "Everyday carry", 400, "IN_STOCK", 13, ["marker", "pen", "carry"]),
  product("CHALK", "Chalk set, multicolor", "Everyday carry", 900, "LOW_STOCK", 2, ["chalk", "drawing", "carry"]),
];

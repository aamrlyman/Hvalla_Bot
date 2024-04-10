import { ItemQualities, QualityAndMaxRange } from "./item_qualities";
import { Activity } from "./Character_info";
interface ItemCategoriesRanges {
  quality: string;
  ranges: { [key: number]: string };
}

export class ItemQualitiesAndCategoriesByActivity {
  type: string; // Assuming 'Activity' is a string enum or similar
  categories: ItemCategoriesRanges[];
  category_ranges_by_quality: { [key: string]: ItemCategoriesRanges };

  constructor(
    type: Activity,
    item_categories: ItemCategoriesRanges[]
  ) {
    this.type = type;
    this.categories = item_categories;
    this.category_ranges_by_quality = {};

    for (const category of item_categories) {
      this.category_ranges_by_quality[category.quality] = category;
    }
  }
}

const exploration_poor: ItemCategoriesRanges = {
  quality: "poor",
  ranges: {
    15: "Vendor trash",
    30: "Crafted",
    45: "Ore",
    60: "Meat",
    75: "Bone",
    90: "Pelts",
    105: "Herbs",
  },
};
const exploration_common: ItemCategoriesRanges = {
  quality: "common",
  ranges: {
    6: "Vendor trash",
    12: "Consumables",
    19: "Crafted",
    26: "Tools",
    33: "Ore",
    40: "Gem",
    47: "Meat",
    54: "Bone",
    61: "Pelt",
    68: "Vegetable",
    75: "Fruit",
    82: "Herb",
    89: "Plant",
    96: "Accessories/Armor/Weapons/Cosmetic",
    100: "Companion",
  },
};

const exploration_uncommon: ItemCategoriesRanges = {
  quality: "uncommon",
  ranges: {
    8: "Vendor trash",
    16: "Consumables",
    24: "Crafted",
    32: "Ore",
    40: "Gem",
    48: "Meat",
    56: "Bone",
    64: "Pelt",
    72: "Fruit",
    81: "Plant",
    90: "Accessories/Armor/Weapons/Cosmetic",
    100: "Companion",
  },
};

const exploration_rare: ItemCategoriesRanges = {
  quality: "rare",
  ranges: {
    11: "Vendor trash",
    22: "Crafted",
    33: "Ore",
    44: "Gem",
    55: "Meat",
    66: "Bone",
    77: "Pelt",
    88: "Fruit",
    99: "Accessories/Armor/Weapons/Cosmetic",
  },
};

const exploration_epic: ItemCategoriesRanges = {
  quality: "epic",
  ranges: {
    14: "Vendor trash",
    28: "Consumable",
    42: "Crafted",
    56: "Tools",
    70: "Ore",
    84: "Gem",
    98: "Herb",
  },
};

export const exploration_items_and_categories = new ItemQualitiesAndCategoriesByActivity(
  Activity.EXPLORING,
  [
    exploration_poor,
    exploration_common,
    exploration_uncommon,
    exploration_rare,
    exploration_epic,
  ]
);

// const hunting_items_and_categories = new ItemQualitiesAndCategoriesByActivity(
//   "HUNTING",
//   new ItemQualities("HUNTING", {}),
//   []
// );
// const scavenging_items_and_categories = new ItemQualitiesAndCategoriesByActivity(
//   "SCAVENGING",
//   new ItemQualities("SCAVENGING", {}),
//   []
// );

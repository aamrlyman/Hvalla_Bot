import { ItemCategoryRanges, ItemCategoriesByQuality } from "./activity_zone_data";




const exploration_poor: ItemCategoryRanges = {
    15: "Vendor trash",
    30: "Crafted",
    45: "Ore",
    60: "Meat",
    75: "Bone",
    90: "Pelts",
    105: "Herbs",
};
const exploration_common: ItemCategoryRanges = {
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
};

const exploration_uncommon: ItemCategoryRanges = {
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
};

const exploration_rare: ItemCategoryRanges = {
    11: "Vendor trash",
    22: "Crafted",
    33: "Ore",
    44: "Gem",
    55: "Meat",
    66: "Bone",
    77: "Pelt",
    88: "Fruit",
    99: "Accessories/Armor/Weapons/Cosmetic",
};

const exploration_epic: ItemCategoryRanges = {
    14: "Vendor trash",
    28: "Consumable",
    42: "Crafted",
    56: "Tools",
    70: "Ore",
    84: "Gem",
    98: "Herb",
};

export const explorationCategoriesByQuality: ItemCategoriesByQuality =
{
    poor: exploration_poor,
    common: exploration_common, 
    uncommon: exploration_uncommon,
    rare: exploration_rare,
    epic: exploration_epic,
};

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

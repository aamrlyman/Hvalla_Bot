import { generateRandNum, valueRangeMapper, isBonus } from "./shared_functions";
import { Character, Bonus, Activity } from "../Data/character_info";
import { itemQuantityRanges } from "../Data/item_quantity_ranges";
import {
  Item,
  Categories,
  Category,
  CategoryWithItems,
  Container,
  ContainerWithCategories,
} from "../Data/activity_zone_data";

export interface ItemInfo {
  item: Item;
  rollPath: { category: string; roll: number }[];
}

export function getItems(
  character: Character,
  activityZoneData: Categories,
  diceRoller: CallableFunction
): ItemInfo[] {
  const items: ItemInfo[] = [];
  const baseNumOfItems = calcNumberOfItems(
    isBonus(character.bonuses, Bonus.HIGHER_PROBABILITY_FOR_MORE_ITEMS),
    diceRoller
  );
  const totalItems = numOfItemsWithBonus(character, baseNumOfItems);
  for (let i = 0; i < totalItems; i++) {
    const item = getItem(activityZoneData, diceRoller);
    if (item) {
      items.push(item);
    }
  }
  return items;
}

export function calcNumberOfItems(
  betterProbabilityForMoreItemsBonus: boolean,
  diceRole: CallableFunction
): number {
  const ranges = betterProbabilityForMoreItemsBonus
    ? itemQuantityRanges.bonusList
    : itemQuantityRanges.defaultList;
  const numOfItems = valueRangeMapper(diceRole(), ranges);
  return numOfItems;
}

export function numOfItemsWithBonus(
  character: Character,
  baseNumOfItems: number
): number {
  const bonuses = character.bonuses;
  const activity = character.activity;
  const bonus =
    (isBonus(bonuses, Bonus.ADD_ITEM_FOR_EXPLORING) &&
      activity === "EXPLORING") ||
    (isBonus(bonuses, Bonus.ADD_ITEM_FOR_HUNTING) && activity === "HUNTING");
  const totalItems = bonus ? baseNumOfItems + 1 : baseNumOfItems;
  return totalItems;
}

export function getItem(
  zoneData: Categories,
  generateRandNum: CallableFunction
): ItemInfo {
  if (!hasCategoriesList(zoneData)) {
    throw new Error("Invalid input: " + zoneData);
  }
  let currentData: Category[] = zoneData.list;
  let currentCategory: Category | null = null;
  const rollPath = [];

  try {
    while (true) {
      const roll = generateRandNum(getDiceRollMaxValue(currentData));
      currentCategory = getCategoryWithRollValue(currentData, roll);
      rollPath.push({ category: currentCategory.name, roll: roll });
      if (!isCategory(currentCategory)) {
        throw new Error("Non-category found with key: " + currentCategory);
      }
      if (isCategoryWithItems(currentCategory)) {
        const includeZeroIndex = 1;
        if (currentCategory.items.length === 0) {
          throw new Error(
            "No items found in category: " + currentCategory.name
          );
        }
        const itemRoll =
          generateRandNum(currentCategory.items.length) - includeZeroIndex;
        const itemInfo = { item: currentCategory.items[itemRoll], rollPath };
        if (
          !itemInfo.item ||
          !itemInfo.rollPath ||
          !itemInfo.item.name ||
          itemInfo === null ||
          itemInfo === undefined
        ) {
          throw new Error("Error getting item info");
        }
        return itemInfo;
      } else {
        currentData = currentCategory.categories.list;
      }
    }
  } catch (error) {
    throw new Error(
      "Error finding category with items at path " +
        rollPath.map((p) => `${p.category}:${p.roll}`).join(", "),
      { cause: error }
    );
  }
}

export function getDiceRollMaxValue(categoryList: Category[]): number {
  if (categoryList.length === 0 || !isCategoriesList(categoryList)) {
    throw new Error("Invalid CategoryList:" + JSON.stringify(categoryList));
  }
  const maxRollValue = Math.max(
    ...categoryList.map((category) => category.inclusiveMaxRoll)
  );
  return maxRollValue;
}

export function getCategoryWithRollValue(
  categoryList: Category[],
  rollValue: number
): Category {
  if (!isCategoriesList(categoryList)) {
    throw new Error("Invalid CategoryList: " + categoryList);
  }
  for (const category of categoryList) {
    if (rollValue <= category.inclusiveMaxRoll) {
      return category;
    }
  }
  throw new Error("No category found for roll value: " + rollValue);
}

export function hasCategoriesList(
  container: Category[] | Container | Categories
): container is Categories {
  return (
    typeof container === "object" &&
    "list" in container &&
    Array.isArray(container.list) &&
    container.list.every((item) => isCategory(item))
  );
}

export function isContainerWithCategories(
  container: Container | Categories
): container is ContainerWithCategories {
  return (
    typeof container === "object" &&
    !("list" in container) &&
    Object.keys(container).every((key) => hasCategoriesList(container[key]))
  );
}

export function isCategoriesList(
  container: Category[] | Container | Categories
): container is Category[] {
  return (
    typeof container === "object" &&
    Array.isArray(container) &&
    container.every((item) => isCategory(item))
  );
}

export function isCategoryWithItems(
  value: Category
): value is CategoryWithItems {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "inclusiveMaxRoll" in value &&
    "items" in value
  );
}

export function isCategory(value: Container | Category): value is Category {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "inclusiveMaxRoll" in value &&
    ("items" in value || "categories" in value)
  );
}

const character1: Character = {
  name: "Ranger",
  id: "1",
  area: "The Great Root",
  activity: Activity.HUNTING,
  zone: "forest of glime",
  prey: "Arthro",
  bonuses: [Bonus.REROLL_ON_HUNTING_FAILURE],
};
const character2: Character = {
  name: "Ranger",
  id: "1",
  area: "The Great Root",
  activity: Activity.EXPLORING,
  zone: "forest of glime",
  bonuses: [],
};

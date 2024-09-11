import { Character, Activity, Bonus } from "../Data/character_info";
import { Item, Container, Category } from "../Data/activity_zone_data";
import {
  CategoriesContainer,
  exampleData,
  CategoryWithItems,
} from "../Data/mock_data";
import { generateRandNum } from "./shared_functions";

const character: Character = {
  name: "Ranger",
  id: "1",
  area: "The Great Root",
  activity: Activity.HUNTING,
  zone: "forest of glime",
  prey: "Arthro",
  bonuses: [Bonus.REROLL_ON_HUNTING_FAILURE],
};

function getItem(zoneData: CategoriesContainer): {
  item: Item;
  rollPath: { category: string; roll: number }[];
} {
  if (!isCategoriesContainer(zoneData)) {
    throw new Error("Invalid input: " + zoneData);
  }
  let currentData: CategoriesContainer = zoneData;
  let currentCategory: Category | null = null;
  const rollPath = [];

  try {
    while (true) {
      const roll = generateRandNum(getDiceRollMaxValue(currentData));
      const categoryKey = getCategoryKeyWithRollValue(currentData, roll);
      rollPath.push({ category: categoryKey, roll: roll });
      currentCategory = currentData[categoryKey];
      if (!isCategory(currentCategory)) {
        throw new Error("Non-category found with key: " + categoryKey);
      }
      if (isCategoryWithItems(currentCategory)) {
        const includeZeroIndex = 1;
        const itemRoll =
          generateRandNum(currentCategory.items.length) - includeZeroIndex;
        return { item: currentCategory.items[itemRoll], rollPath };
      } else {
        currentData = currentCategory.categories;
      }
    }
  } catch (error) {
    throw new Error(
      "Error finding category with items at path " +
        rollPath.map((p) => `${p.category}:${p.roll}`).join(","),
      { cause: error }
    );
  }
}

function getZoneData(
  allData: Container,
  zoneDataPath: string[]
): CategoriesContainer {
  let zoneData = allData;
  for (const path of zoneDataPath) {
    zoneData = zoneData[path] as Container;
  }
  if (isCategoriesContainer(zoneData)) {
    return zoneData;
  }
  throw new Error(
    `Zone data at path ${zoneDataPath} is not a CategoriesContainer`
  );
}

function getZoneDataPath(character: Character): string[] {
  const zoneDataPath: string[] = [character.activity.valueOf(), character.zone];
  if (character.prey) {
    zoneDataPath.push(character.prey);
  }
  return zoneDataPath;
}
// console.log(getZoneDataPath(character));
// console.log(getZoneData(exampleData, getZoneDataPath(character)));

function getDiceRollMaxValue(container: CategoriesContainer): number {
  const categoryList = Object.values(container);
  const maxRollValue = Math.max(
    ...categoryList.map((category) => category.inclusiveMaxRoll)
  );
  return maxRollValue;
}

function getCategoryKeyWithRollValue(
  container: CategoriesContainer,
  rollValue: number
): string {
  for (const categoryKey in container) {
    if (rollValue <= container[categoryKey].inclusiveMaxRoll) {
      return categoryKey;
    }
  }
  throw new Error("No category found for roll value: " + rollValue);
}

function isCategoriesContainer(
  container: Category | Container
): container is CategoriesContainer {
  let isContainerOfCategories = false;
  if (isCategory(container)) {
    return isContainerOfCategories;
  }
  for (const key in container) {
    if (!isCategory(container[key])) {
      return isContainerOfCategories;
    }
  }
  isContainerOfCategories = true;
  return isContainerOfCategories;
}
function isCategory(category: Category | Container): category is Category {
  return "inclusiveMaxRoll" in category;
}

function isCategoryWithItems(
  category: Category
): category is CategoryWithItems {
  return "items" in category;
}

const zoneData = getZoneData(exampleData, getZoneDataPath(character));
console.log(getItem(zoneData));

import { Character, Activity, Bonus } from "../Data/character_info";
import {
  exampleData,
  Item,
  Category,
  Container,
  CategoryWithItems,
  Categories,
  ContainerWithCategories,
} from "../Data/mock_data";
import { generateRandNum } from "./shared_functions";

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

export function getItem(
  zoneData: ContainerWithCategories,
  generateRandNum: CallableFunction,
  getDiceRollMaxValue: CallableFunction
): {
  item: Item;
  rollPath: { category: string; roll: number }[];
} {
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
        const itemRoll =
          generateRandNum(currentCategory.items.length) - includeZeroIndex;
        return { item: currentCategory.items[itemRoll], rollPath };
      } else {
        currentData = currentCategory.categories.list;
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

export function getZoneData(
  allData: Container,
  zoneDataPath: string[]
): ContainerWithCategories {
  let zoneData = allData;
  for (const path of zoneDataPath) {
    zoneData = zoneData[path] as Container;
  }
  if (hasCategoriesList(zoneData)) {
    return zoneData as ContainerWithCategories;
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

export function getDiceRollMaxValue(categoryList: Category[]): number {
  if (categoryList.length === 0 || !isCategoriesList(categoryList)) {
    throw new Error("Invalid container: " + categoryList);
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

const zoneData = getZoneData(exampleData, getZoneDataPath(character1));
console.log(
  "Character Items:",
  getItem(zoneData, generateRandNum, getDiceRollMaxValue)
);
const zoneData1 = getZoneData(exampleData, getZoneDataPath(character2));
console.log(
  "Character2 Items",
  getItem(zoneData1, generateRandNum, getDiceRollMaxValue)
);

// if ("forest of glime" in exampleData.EXPLORING) {
//   if (isCategoryArray(exampleData["EXPLORING"]["forest of glime"])) {
//     let roll = getDiceRollMaxValue(exampleData["EXPLORING"]["forest of glime"]);
//     console.log(roll);
//   }
// }
// if ("forest of glime" in exampleData.HUNTING) {
//   if ("Arthro" in exampleData.HUNTING["forest of glime"]) {
//     const arthroData = exampleData.HUNTING["forest of glime"]["Arthro"];
//     if (Array.isArray(arthroData) && "categories" in arthroData[0]) {
//       console.log("Prey:", isCategoryArray(arthroData[0].categories));
//     }
//     console.log("forest of glime hunting:", isCategoryArray(arthroData));
//   }
// }
// console.log("EXPLORING:", isCategoryArray(exampleData["EXPLORING"]));
// console.log("exampleData:", isCategoryArray(exampleData));

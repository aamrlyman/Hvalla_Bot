import { Activity, Character, PreyType, ZoneType } from "./character_info";
import transformed_data from "./json_data/transformed_data.json";
import { hasCategoriesList } from "../Logic/item_calculation";

export interface Item {
  name: string;
  id: string;
  URL?: string | null | undefined;
}
export interface Container {
  [key: string]: Container | Categories;
}
export interface ContainerWithCategories {
  [key: string]: Categories;
}
export interface ContainerWithContainer {
  [key: string]: Container;
}
export interface Categories {
  list: Category[];
}
export type Category = CategoryWithItems | CategoryWithCategories;
export interface CategoryWithItems {
  name: string;
  inclusiveMaxRoll: number;
  items: Item[];
}

export interface CategoryWithCategories {
  name: string;
  inclusiveMaxRoll: number;
  categories: Categories;
}

const allActivityZoneData: Container = transformed_data;

export function getActivityZoneData(character: Character): Categories | string {
  const zoneDataPath = getZoneDataPath(character);
  return getZoneData(zoneDataPath);
}
export function getZoneData(
  zoneDataPath: string[],
  testData?: Container
): Categories {
  let zoneData = testData ? testData : allActivityZoneData;
  for (const path of zoneDataPath) {
    if (!zoneData.hasOwnProperty(path)) {
      throw new Error(`Path ${path} not found in zone data`);
    }
    zoneData = zoneData[path] as Container;
  }
  if (hasCategoriesList(zoneData)) {
    return zoneData;
  }
  throw new Error(
    `Zone data at path ${zoneDataPath} is not a Categories Object`
  );
}

function getZoneDataPath(character: Character): string[] {
  const zoneDataPath: string[] = [character.activity.valueOf(), character.zone];
  if (character.prey) {
    zoneDataPath.push(character.prey);
  }
  return zoneDataPath;
}

// Keep for debugging
// const data = getActivityZoneData({
//   name: "Sigelblyse",
//   zone: "forest of glime",
//   activity: Activity.EXPLORING,
//   id: "W28",
//   area: "Hallen Stone",
//   bonuses: ["Forn Gavir", "Raven"],
// } as Character);
// console.log(JSON.stringify(data));

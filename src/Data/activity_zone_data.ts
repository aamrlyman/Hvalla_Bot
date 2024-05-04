import { Activity, Character } from "./character_info";
import { threeZones } from "./validation_info";
import * as fs from "fs";
import * as yaml from "js-yaml";

export interface Item {
  name: string;
  id: string;
  URL: string | null;
}

export interface AllPossibleItems {
  [qualityKey: string]: { [categoryKey: string]: Item[] };
}

export interface QualityAndMaxRange {
  quality: string;
  maxRange: number;
}
export class ItemQualities {
  [key: number]: QualityAndMaxRange;
}

export interface ItemCategoryRanges {
  [key: number]: string;
}

export interface ItemCategoriesByQuality {
  [qualityKey: string]: ItemCategoryRanges;
}

export interface ActivityZoneData {
  itemQualities: ItemQualities;
  itemCategoriesByQuality: ItemCategoriesByQuality;
  allPossibleItems: AllPossibleItems;
}

export interface HuntingActivityZoneData {
  [key: string]: ActivityZoneData;
}

interface AllActivityZoneFiles {
  [preyAnimal: string]: { [zoneKey: string]: string };
}

export const allActivityZoneFileNames: AllActivityZoneFiles = {
  [Activity.EXPLORING]: {
    [threeZones.thuheim_mountains.name]: "thuelheim_mountains_exploring",
    [threeZones.forest_of_glime.name]: "forest_of_glime_exploring",
    [threeZones.utgard.name]: "utgard_exploring",
  },
  [Activity.SCAVENGING]: {
    [threeZones.thuheim_mountains.name]: "thuelheim_mountains_scavenging",
    [threeZones.forest_of_glime.name]: "forest_of_glime_scavenging",
    [threeZones.utgard.name]: "utgard_scavenging",
  },
  [Activity.HUNTING]: {
    [threeZones.thuheim_mountains.name]: "thuelheim_mountains_hunting",
    [threeZones.forest_of_glime.name]: "forest_of_glime_hunting",
    [threeZones.utgard.name]: "utgard_hunting",
  },
};

export function getActivityZoneData(
  character: Character
): ActivityZoneData | null | undefined {
  const yamlFilePath: string = getActivityZoneDataFilePath(character);
  const yamlDoc: string = fs.readFileSync(yamlFilePath, "utf8");
  if (character.activity === Activity.HUNTING && character.prey) {
    try {
      const activityZoneData: HuntingActivityZoneData = yaml.load(
        yamlDoc
      ) as HuntingActivityZoneData;
      return activityZoneData[character.prey];
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const activityZoneData: ActivityZoneData = yaml.load(
        yamlDoc
      ) as ActivityZoneData;
      return activityZoneData;
    } catch (e) {
      console.log(e);
    }
  }
}

export function getActivityZoneDataFilePath(character: Character): string {
  const yamlFileName: string =
    allActivityZoneFileNames[character.activity][character.zone];
  const yamlFilePath: string = `src/Data/yaml_data/${yamlFileName}.YAML`;
  if (!fs.existsSync(yamlFilePath)) {
    throw new Error("Activity zone data file not found");
  }
  return yamlFilePath;
}

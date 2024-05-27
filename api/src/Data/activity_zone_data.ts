import { get } from "http";
import { Activity, Character, PreyType, ZoneType } from "./character_info";
// import allActivityZoneData from "../Data/json_data/all_activity_zone_data.json";
import { threeZones } from "./validation_info";

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

interface HuntingZoneData {
  "forest of glime": Record<PreyType, ActivityZoneData>;
  "thuelheim mountains": Record<PreyType, ActivityZoneData>;
  utgard: Record<PreyType, ActivityZoneData>;
}

interface AllActivityZoneData {
  HUNTING: HuntingZoneData;
  EXPLORING: Record<ZoneType, ActivityZoneData>;
  SCAVENGING: Record<ZoneType, ActivityZoneData>;
}

const allActivityZoneData: AllActivityZoneData = require("../Data/json_data/all_activity_zone_data.json");

export function getActivityZoneData(
  character: Character
): ActivityZoneData | string {
  let currentActivityZoneData =
    allActivityZoneData[character.activity][character.zone];

  if (character.activity === Activity.HUNTING && character.prey) {
    currentActivityZoneData =
      allActivityZoneData[character.activity][character.zone][character.prey];
  }
  if (
    currentActivityZoneData.hasOwnProperty("itemQualities") &&
    currentActivityZoneData.hasOwnProperty("itemCategoriesByQuality") &&
    currentActivityZoneData.hasOwnProperty("allPossibleItems")
  ) {
    return currentActivityZoneData as ActivityZoneData;
  }
  return "data not found";
}

// console.log(
//   "accessing direct object",
//   allActivityZoneData["HUNTING"]["forest of glime"]["gryllo"]
// );
// console.log(
//   "accessing through function",
//   getActivityZoneData({
//     name: "Sigelblyse",
//     zone: "forest of glime",
//     activity: Activity.HUNTING,
//     id: "W28",
//     area: "Hallen Stone",
//     prey: "gryllo",
//     bonuses: ["Forn Gavir", "Raven"],
//   } as Character)
// );

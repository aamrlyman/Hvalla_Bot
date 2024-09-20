import { Activity, Character, PreyType, ZoneType } from "./character_info";
import importedAllActivityZoneData from "../Data/json_data/all_activity_zone_data.json";
import { threeZones } from "./validation_info";

export interface Item {
  name: string;
  id: string;
  URL?: string | null | undefined;
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

export interface HuntingItemCategoriesByQuality {
  [qualityKey: string]: {
    [PreyOrOther: string]: ItemCategoryRanges;
  };
}

export interface HuntingAllPossibleItems {
  [qualityKey: string]: {
    [categoryKey: string]: { [categoryKey: string]: Item[] };
  };
}
export interface HuntingActivityZoneData {
  itemQualities: ItemQualities;
  itemCategoriesByQuality: HuntingItemCategoriesByQuality;
  allPossibleItems: HuntingAllPossibleItems;
}
export interface ActivityZoneData {
  itemQualities: ItemQualities;
  itemCategoriesByQuality: ItemCategoriesByQuality;
  allPossibleItems: AllPossibleItems;
}

export interface HuntingData {
  [preyType: string]: HuntingActivityZoneData;
}
export interface AllActivityZoneData {
  HUNTING: Record<ZoneType, HuntingData>;
  EXPLORING: Record<ZoneType, ActivityZoneData>;
  SCAVENGING: Record<ZoneType, ActivityZoneData>;
}

const allActivityZoneData: AllActivityZoneData =
  importedAllActivityZoneData as any;

export function getActivityZoneData(
  character: Character
): ActivityZoneData | HuntingActivityZoneData | string {
  if (!allActivityZoneData.hasOwnProperty(character.activity)) {
    return "activity not found";
  }
  if (!allActivityZoneData[character.activity].hasOwnProperty(character.zone)) {
    return "zone not found";
  }

  if (character.activity === Activity.HUNTING && character.prey) {
    const huntingData = allActivityZoneData.HUNTING[
      character.zone
    ] as HuntingData;
    const currentActivityZoneData = huntingData[character.prey as PreyType];

    if (
      currentActivityZoneData &&
      currentActivityZoneData.hasOwnProperty("itemQualities") &&
      currentActivityZoneData.hasOwnProperty("itemCategoriesByQuality") &&
      currentActivityZoneData.hasOwnProperty("allPossibleItems")
    ) {
      return currentActivityZoneData;
    }
  } else {
    const currentActivityZoneData = allActivityZoneData[character.activity][
      character.zone
    ] as ActivityZoneData;

    if (
      currentActivityZoneData &&
      currentActivityZoneData.hasOwnProperty("itemQualities") &&
      currentActivityZoneData.hasOwnProperty("itemCategoriesByQuality") &&
      currentActivityZoneData.hasOwnProperty("allPossibleItems")
    ) {
      return currentActivityZoneData;
    }
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

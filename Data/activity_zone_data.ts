import { Activity, Character } from "./character_info";
import { threeZones } from "./validation_info";
import * as fs from "fs";
import * as yaml from "js-yaml";

export interface Item {
  name: string;
  id: string;
  url: string | null;
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

const thuelheimExploringYAML = "Data/zone_activity_data/thuelheim_exploring copy.YAML";
const thuelheimExploringDoc= fs.readFileSync(thuelheimExploringYAML, "utf8");
const thuelheimExploringItems: ActivityZoneData = yaml.load(
  thuelheimExploringDoc
) as ActivityZoneData;

console.log(thuelheimExploringItems);
console.log(thuelheimExploringItems.itemQualities);

interface AllActivityZoneData {
  [activityKey: string]: { [zoneKey: string]: ActivityZoneData };
}

export const allActivityZoneData:AllActivityZoneData = {
  EXPLORING: {
    [threeZones.thuheim_mountains.name]: thuelheimExploringItems,
  }

};
export function getActivityZoneData(
  character: Character
): ActivityZoneData | null {
  const activityZoneData:ActivityZoneData = allActivityZoneData[character.activity][character.zone];
  if (activityZoneData) {
    return activityZoneData;
  } else {
    return null;
  }
}
// export const allActivityZoneData:AllActivityZoneData = {
//   EXPLORING: {
//     [threeZones.thuheim_mountains.name]: thuelheimExploringItems,
//     // [threeZones.thuheim_mountains.name]: {
//     //   itemQualities: new ItemQualities({}),
//     //   itemCategoriesByQuality: {},
//     //   itemsFound: [],
//     // },
//     // [threeZones.utgard.name]: {
//     //   itemQualities: new ItemQualities({}),
//     //   itemCategoriesByQuality: {},
//     //   itemsFound: [],
//     // },
//   }
//   // ,
//   // [Activity.HUNTING]: {
//   //   [threeZones.thuheim_mountains.name]: {
//   //     Caribou: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //     Fox: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //     Grunox: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //   },
//   //   [threeZones.forest_of_glime.name]: {
//   //     Arthro: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //     Gryllo: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //     "Clipper Ant": {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //   },
//   //   [threeZones.utgard.name]: {
//   //     Goat: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //     Elk: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //     Deer: {
//   //       itemQualities: new ItemQualities({}),
//   //       itemCategoriesByQuality: {},
//   //       itemsFound: [],
//   //     },
//   //   },
//   // },
//   // [Activity.SCAVENGING]: {
//   //   [threeZones.forest_of_glime.name]: {
//   //     itemQualities: new ItemQualities({}),
//   //     itemCategoriesByQuality: {},
//   //     itemsFound: [],
//   //   },
//   //   [threeZones.thuheim_mountains.name]: {
//   //     itemQualities: new ItemQualities({}),
//   //     itemCategoriesByQuality: {},
//   //     itemsFound: [],
//   //   },
//   //   [threeZones.utgard.name]: {
//   //     itemQualities: new ItemQualities({}),
//   //     itemCategoriesByQuality: {},
//   //     itemsFound: [],
//   //   },
//   // },
// };

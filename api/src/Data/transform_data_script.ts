// DONE set up an input data object and an expected output object in js
// DONE write a function that takes the input data and returns the output data
// DONE convert the input data to json and write the output in json to a file
// assert on the output file and make sure it matches the expected output
// write another function that takes the transormed json data and writes it to a new yaml file
// assert on the yaml file and make sure it matches the expected output
// run the script on the existing data
// integrate new logic into the existing
import { isCategoryWithItems } from "../Logic/item_calculation";
import { Activity } from "./character_info";
import { input } from "./json_data/transform_practice_data";
import {
  Categories,
  Category,
  CategoryWithCategories,
  Container,
  Item,
} from "./activity_zone_data";
import oldJsonData from "../Data/json_data/all_activity_zone_data.json";

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const inputFilePath = path.join(
  "C:/Users/aamrl/OneDrive/Desktop/hvalla_bot/api/src/Data/json_data/",
  "transformed_data.json"
);

import { ZoneType } from "./character_info";
export interface AllPossibleItems {
  [qualityKey: string]: { [categoryKey: string]: Item[] };
}

export interface QualityAndMaxRange {
  quality: string;
  maxRange: number;
}
export class ItemQualities {
  [key: string]: QualityAndMaxRange;
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
  // HUNTING: Record<ZoneType, ActivityZoneData>;
  EXPLORING: Record<ZoneType, ActivityZoneData>;
  SCAVENGING: Record<ZoneType, ActivityZoneData>;
}

// const jsonFilePath = path.join(__dirname, "json_data/transformed_data.json");
// const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

// const yamlData = yaml.dump(jsonData);

// const yamlFilePath = path.join(__dirname, "yaml_data", "transformed_data.yaml");

// fs.writeFileSync(yamlFilePath, yamlData, "utf8");

// console.log("YAML file written to:", yamlFilePath);

// function transformDataAndWriteToJSON(filePath: string, data: any) {
//   const transformedData = transformData(data);
//   writeToJSON(filePath, transformedData);
// }

// transformDataAndWriteToJSON(inputFilePath, oldJsonData);

export function writeToJSON(filePath: string, data: Container) {
  console.log("Writing to file", filePath);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File has been written to" + filePath);
    }
  });
}

export function transformData(data: {
  [key: string]: { [key: string]: ActivityZoneData };
}): Container {
  return Object.entries(data)
    .filter(([key]) => key !== "HUNTING")
    .reduce(
      (activityAcc, [activityName, activity]) => ({
        ...activityAcc,
        [activityName]: Object.entries(activity).reduce(
          (acc, [zoneName, zone]) => ({
            ...acc,
            [zoneName]: getItemQualities(zone),
          }),
          {}
        ),
      }),
      {}
    );
}
transformData(input);

function getItemQualities(zoneData: ActivityZoneData): Categories {
  zoneData.itemCategoriesByQuality;
  const categoryList: Category[] = Object.entries(zoneData.itemQualities).map(
    ([key, quality]) => ({
      name: quality.quality,
      inclusiveMaxRoll: parseInt(key),
      categories: {
        list: Object.entries(
          zoneData.itemCategoriesByQuality[quality.quality]
        ).map(([categoryMaxRangeKey, name]) => ({
          name,
          inclusiveMaxRoll: parseInt(categoryMaxRangeKey),
          items: zoneData.allPossibleItems[quality.quality][name],
        })),
      },
    })
  );
  const newZoneData: Categories = { list: categoryList };

  return newZoneData;
}

// DONE set up an input data object and an expected output object in js
// DONE write a function that takes the input data and returns the output data
// DONE convert the input data to json and write the output in json to a file
// assert on the output file and make sure it matches the expected output
// write another function that takes the transormed json data and writes it to a new yaml file
// assert on the yaml file and make sure it matches the expected output
// run the script on the existing data
// integrate new logic into the existing

import { isCategoryWithItems } from "../Logic/new_logic";
import {
  ActivityZoneData,
  Item,
  AllPossibleItems,
  ItemCategoryRanges,
  AllActivityZoneData,
  ItemCategoriesByQuality,
} from "./activity_zone_data";
import { Activity } from "./character_info";
import { input } from "./json_data/transform_practice_data";
import {
  Categories,
  Category,
  CategoryWithCategories,
  Container,
} from "./mock_data";
import oldJsonData from "../Data/json_data/all_activity_zone_data.json";

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const inputFilePath = path.join(
  "C:/Users/aamrl/OneDrive/Desktop/hvalla_bot/api/src/Data/json_data/",
  "transformed_data.json"
);

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

function writeToJSON(filePath: string, data: Container) {
  console.log("Writing to file", filePath);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File has been written to" + filePath);
    }
  });
}

export function transformData(data: any): Container {
  const container = {};
  const activities = Object.keys(data).filter((key) => {
    return key !== "HUNTING";
  });
  for (const activity of activities) {
    const zonesNames = Object.keys(data[activity as Activity]);
    const zones = {};
    for (let zoneName of zonesNames) {
      Object.assign(zones, {
        [zoneName]: transformZoneData(data[activity][zoneName]),
      });
    }
    Object.assign(container, { [activity]: zones });
  }
  return container;
}
transformData(input);

export function transformZoneData(zoneData: ActivityZoneData): Categories {
  const itemQualities = getItemQualities(zoneData);
  const categories = getCategories(
    zoneData.itemCategoriesByQuality,
    itemQualities
  );
  return addItemsToCategory(zoneData.allPossibleItems, categories);
}

function getItemQualities(zoneData: ActivityZoneData): Categories {
  const itemQualities = zoneData.itemQualities;
  const categoryList: Category[] = [];
  const newZoneData: Categories = { list: categoryList };
  for (const key in itemQualities) {
    const newItem = {
      name: itemQualities[key].quality,
      inclusiveMaxRoll: parseInt(key),
      categories: {
        list: [],
      },
    };
    newZoneData.list.push(newItem);
  }
  return newZoneData;
}

function getCategories(
  categoriesByQuality: ItemCategoriesByQuality,
  itemQualities: Categories
): Categories {
  const workingList: Category[] = itemQualities.list;

  for (const category of workingList) {
    if (isCategoryWithCategories(category)) {
      for (const categoryMaxRangeKey in categoriesByQuality[category.name]) {
        category.categories.list.push({
          name: categoriesByQuality[category.name][categoryMaxRangeKey],
          inclusiveMaxRoll: parseInt(categoryMaxRangeKey),
          items: [],
        });
      }
    }
  }

  return itemQualities;
}

function isCategoryWithCategories(
  category: Category
): category is CategoryWithCategories {
  return "categories" in category && "list" in category.categories;
}

function addItemsToCategory(
  items: AllPossibleItems,
  workingList: Categories
): Categories {
  workingList.list.forEach((quality) => {
    if (isCategoryWithCategories(quality)) {
      quality.categories.list.forEach((category) => {
        const categoryItems: Item[] = items[quality.name][category.name];
        categoryItems.forEach((item) => {
          if (isCategoryWithItems(category)) {
            category.items.push(item);
          }
        });
      });
    }
  });
  return workingList;
}

const transformedData = getItemQualities(input.EXPLORING["forest of glime"]);

const transformedData2 = getCategories(
  input.EXPLORING["forest of glime"].itemCategoriesByQuality,
  transformedData
);

export const transformData3 = addItemsToCategory(
  input.EXPLORING["forest of glime"].allPossibleItems,
  transformedData2
);

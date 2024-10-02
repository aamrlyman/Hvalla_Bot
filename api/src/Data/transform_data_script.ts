// DONE set up an input data object and an expected output object in js
// DONE write a function that takes the input data and returns the output data
// convert the input data to json and write the output in json to a file
// assert on the output file and make sure it matches the expected output
// write another function that takes the transormed json data and writes it to a new yaml file
// assert on the yaml file and make sure it matches the expected output
// run the script on the existing data

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
import { expected, input } from "./json_data/transform_practice_data";
import {
  Categories,
  Category,
  CategoryWithCategories,
  Container,
  CategoryWithItems,
} from "./mock_data";

export function transformData(data: any): Container {
  const container = {};
  const activities = Object.keys(data).filter((key) => {
    return key !== "HUNTING";
  });
  for (const activity of activities) {
    Object.assign(container, { [activity]: {} });
    const zones = Object.keys(data[activity as Activity]);
    for (let zone of zones) {
      Object.assign(container, {
        [activity]: { [zone]: transformZoneData(data[activity][zone]) },
      });
    }
  }

  return container;
}
console.log("main output", JSON.stringify(transformData(input)));

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
// console.log("step 1:", transformedData);

const transformedData2 = getCategories(
  input.EXPLORING["forest of glime"].itemCategoriesByQuality,
  transformedData
);
// console.log("Step 2", JSON.stringify(transformedData2));

export const transformData3 = addItemsToCategory(
  input.EXPLORING["forest of glime"].allPossibleItems,
  transformedData2
);

// console.log("Step 3", JSON.stringify(transformData3));

function test() {
  return transformData3 === expected.EXPLORING["forest of glime"];
}

// console.log("test", test());

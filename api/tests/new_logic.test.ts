import { expect, it, describe } from "@jest/globals";
import {
  exampleData,
  Item,
  Category,
  Container,
  CategoryWithItems,
  Categories,
  ContainerWithCategories,
} from "../src/Data/mock_data";
import {
  getItem,
  getDiceRollMaxValue,
  getZoneData,
  getCategoryWithRollValue,
  hasCategoriesList,
  isCategoriesList,
  isCategoryWithItems,
} from "../src/Logic/new_logic";

import {
  categoryArrayWithItems,
  categoryArrayWithNestedCategories,
} from "./newLogicTestCases";

describe("getDiceRollMaxValueTests", () => {
  it("should return the inclusiveMaxRoll value of the category", () => {
    expect(getDiceRollMaxValue(categoryArrayWithNestedCategories)).toBe(100);
    if (!isCategoryWithItems(categoryArrayWithNestedCategories[0])) {
      expect(
        getDiceRollMaxValue(
          categoryArrayWithNestedCategories[0].categories.list
        )
      ).toBe(20);
    }
    expect(getDiceRollMaxValue(categoryArrayWithItems)).toBe(100);
  });
});

describe("getZoneData", () => {});
describe("getCategoryWithRollValue", () => {});
describe("hasCategoriesList", () => {});
describe("isCategoriesList", () => {});
describe("isCategoryWithItems", () => {});

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
  categoryArryMissingInclusiveMaxRoll,
  getMaxRollErrorCases,
  getMaxRollNormalCases,
  getZoneDataTestCases,
} from "./newLogicTestCases";
import test from "node:test";

describe("getDiceRollMaxValueTests", () => {
  getMaxRollNormalCases.forEach((testCase) => {
    it(`should return ${testCase.expected} for ${testCase.name}`, () => {
      expect(getDiceRollMaxValue(testCase.input)).toEqual(testCase.expected);
    });
  });
  getMaxRollErrorCases.forEach((testCase) => {
    it(`should throw error when ${testCase.name} is passed in`, () => {
      expect(() => getDiceRollMaxValue(testCase.input as Category[])).toThrow(
        testCase.expected ? testCase.expected : /Invalid CategoryList:/
      );
    });
  });
});

describe("getZoneData", () => {
  getZoneDataTestCases.forEach((testCase) => {
    it(`should return ${testCase.expected} for ${testCase.name}`, () => {
      if (testCase.error) {
        expect(() => getZoneData(exampleData, testCase.input)).toThrow();
      } else {
        const zoneData = getZoneData(exampleData, testCase.input);
        expect(zoneData.list[0].name).toEqual(testCase.expected);
      }
    });
  });
});
describe("getCategoryWithRollValue", () => {});
describe("hasCategoriesList", () => {});
describe("isCategoriesList", () => {});
describe("isCategoryWithItems", () => {});

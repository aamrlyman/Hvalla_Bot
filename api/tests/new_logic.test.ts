import { expect, it, describe, jest } from "@jest/globals";
import { exampleData, Category, Categories } from "../src/Data/mock_data";
import {
  getItem,
  getDiceRollMaxValue,
  getZoneData,
  getCategoryWithRollValue,
} from "../src/Logic/new_logic";

import {
  getCategoryWithRollValueTestCases,
  getMaxRollErrorCases,
  getMaxRollNormalCases,
  getZoneDataTestCases,
  forestOfGlimeExploring,
  getItemTestCases,
} from "./test_data/newLogicTestCases";

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
        expect(() => getZoneData(exampleData, testCase.input)).toThrow(
          testCase.expected
        );
      } else {
        const zoneData = getZoneData(exampleData, testCase.input);
        expect(zoneData.list[0].name).toEqual(testCase.expected);
      }
    });
  });
});
describe("getCategoryWithRollValue", () => {
  getCategoryWithRollValueTestCases.forEach((testCase) => {
    it(`${testCase.name}`, () => {
      if (testCase.error) {
        expect(() =>
          getCategoryWithRollValue(
            testCase.inputList as Category[],
            testCase.inputRollValue
          )
        ).toThrow(testCase.expected);
      } else {
        const category = getCategoryWithRollValue(
          testCase.inputList as Category[],
          testCase.inputRollValue
        );
        expect(category.name).toEqual(testCase.expected);
      }
    });
  });
});

const dyeThatAlwaysRolls1 = jest.fn(() => {
  return 1;
});
describe("getItem", () => {
  it("should return and item and a rollPath", () => {
    const itemInfo = getItem(forestOfGlimeExploring, dyeThatAlwaysRolls1);
    expect("item" in itemInfo);
    expect("rollPath" in itemInfo);
    expect(Array.isArray(itemInfo.rollPath)).toBe(true);
    expect("category" in itemInfo.rollPath[0]);
    expect("roll" in itemInfo.rollPath[0]);
  });

  getItemTestCases.forEach((testCase) => {
    it(`${testCase.name}`, () => {
      if (testCase.error) {
        // try {
        expect(() =>
          getItem(testCase.input as Categories, testCase.dye)
        ).toThrow(testCase.expected);
        // } catch (error) {
        //   console.log(error);
        //   if (
        //     error instanceof Error &&
        //     "cause" in error &&
        //     error.cause instanceof Error
        //   ) {
        //     expect(error.cause.message).toContain("qwqw");
        //   }
        // }
      } else {
        expect(
          getItem(testCase.input as Categories, testCase.dye).item.name
        ).toEqual(testCase.expected);
      }
    });
  });
});

describe("hasCategoriesList", () => {});
describe("isCategoriesList", () => {});
describe("isCategoryWithItems", () => {});

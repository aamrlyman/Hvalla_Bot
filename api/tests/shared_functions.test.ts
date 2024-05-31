import {
  generateRandNum,
  valueRangeMapper,
} from "../src/Logic/shared_functions";
import { expect, test, describe } from "@jest/globals";

describe("test generateRandNum function", () => {
  test("Make sure max range is inclusive", () => {
    let countInstancesOfMaxRange = 0;
    for (let i = 0; i > 100; i++) {
      const randNum = generateRandNum(2);
      expect(randNum).toBeLessThan(3);
      expect(randNum).toBeGreaterThanOrEqual(0);
      if (randNum === 2) {
        countInstancesOfMaxRange += 1;
      }
      expect(countInstancesOfMaxRange).toBeGreaterThan(0);
    }
  });
  test("Make sure min range starts at 1", () => {
    for (let i = 0; i > 100; i++) {
      const randNum: number = generateRandNum(2);
      const randNumBool = randNum === 1 || randNum === 2;
      expect(randNumBool).toBe(true);
    }
  });
  test("Test even distribution of probabilities in 100", () => {
    let randNumsGreaterThan30: number = 0;
    for (let i = 1; i < 101; i++) {
      const randNum: number = generateRandNum(100);
      if (randNum > 30) {
        randNumsGreaterThan30 += 1;
      }
    }
    console.log(randNumsGreaterThan30);
    expect(randNumsGreaterThan30).toBeGreaterThan(60);
  });
  test("Make sure rand nums aren't above the max", () => {
    let randNumsGreaterThanMax: number = 0;
    let maxRange = 50;
    for (let i = 1; i < 10000; i++) {
      const randNum: number = generateRandNum(maxRange);
      if (randNum > maxRange) {
        randNumsGreaterThanMax += 1;
      }
    }
    expect(randNumsGreaterThanMax).toEqual(0);
  });
});

const rangeMap = {
  10: "L1",
  20: "L2",
  30: "L3",
  40: "L4",
  50: "L5",
};
const inputAndExpected = [
  { input: 0, expected: "L1" },
  { input: 9, expected: "L1" },
  { input: 10, expected: "L1" },
  { input: 11, expected: "L2" },
  { input: 19, expected: "L2" },
  { input: 20, expected: "L2" },
  { input: 21, expected: "L3" },
  { input: 50, expected: "L5" },
];

describe("test valueRangeMapper function", () => {
  test("make sure threshold keys return expected values", () => {
    inputAndExpected.forEach((item) => {
      expect(valueRangeMapper(item.input, rangeMap)).toEqual(item.expected);
    });
  });
  test("make sure a value greater than max throws error", () => {
    const errorCase = 51;
    expect(() => valueRangeMapper(errorCase, rangeMap)).toThrow();
  });
});

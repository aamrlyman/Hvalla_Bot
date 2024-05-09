import {
  getActivityFromInput,
  activities,
  getPropertyFromInput,
  getBonusFromInput,
} from "../src/logic/parse_user_input";

import { Character, Bonus } from "../src/Data/character_info";
import { Activity } from "../src/Data/character_info";
import { userInputs, userInputPropertyTests } from "./user_input_testcases";

const inputNoActivity = `scaveging 
  
Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim 
Activity-specific Bonuses:`;

describe("test getActivityFromInput", () => {
  userInputs.forEach((testCase) => {
    test(testCase.name, () => {
      const activity = getActivityFromInput(testCase.input) as Activity;
      expect(activities.includes(activity)).toBe(true);
    });
  });
  test("No Activity", () => {
    const activity = getActivityFromInput(inputNoActivity);
    expect(activity).toBeUndefined();
  });
});

const inputNoBonuses = `scaveging 
  
Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim 
Activity-specific Bonuses:`;

describe("test getActivityFromInput", () => {
  userInputs.forEach((testCase) => {
    test(testCase.name, () => {
      const bonusList = getBonusFromInput(testCase.input);
      expect(
        bonusList.every((item) => Object.values(Bonus).includes(item))
      ).toBe(true);
    });
    test("Test no bonuses", () => {
      const bonusList = getBonusFromInput(inputNoBonuses);
      expect(bonusList).toEqual([]);
    });
  });
});

const propertyInputs: string[] = ["zone", "area", "prey"];

describe("test getActivityFromInput", () => {
  userInputPropertyTests.forEach((testCase) => {
    test(testCase.name, () => {
      propertyInputs.forEach((property) => {
        const propertyValue = getPropertyFromInput(testCase.input, property);
        expect(propertyValue).toEqual(testCase.expected[property]);
      });
    });
  });
});

// describe("test getActivityZoneData function", () => {
//   test("make sure getActivityZoneData can get nested items from yaml", () => {});
// });

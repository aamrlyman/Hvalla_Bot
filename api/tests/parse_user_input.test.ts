import {
  getActivityFromInput,
  activities,
  getPropertyFromInput,
  getBonusesFromInput,
  createCharacterFromInput,
} from "../src/Logic/parse_user_input";

import { Character, Bonus } from "../src/Data/character_info";
import { Activity } from "../src/Data/character_info";
import {
  userInputs,
  userInputPropertyTests,
  badUserInputs,
} from "./user_input_testcases";
import { expect, test, describe } from "@jest/globals";

const inputNoActivity = `
  
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
const inputNoBonusKey = `scaveging 
  
Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim`;

describe("test getBonusesFromInput", () => {
  userInputs.forEach((testCase) => {
    test(testCase.name, () => {
      const bonusList = getBonusesFromInput(testCase.input);
      expect(bonusList.length).toBeGreaterThan(0);
      expect(
        bonusList.every((item) => Object.values(Bonus).includes(item))
      ).toBe(true);
    });
  });
  test("Test no bonuses", () => {
    const bonusList = getBonusesFromInput(inputNoBonuses);
    expect(bonusList.length).toEqual(0);
  });
  test("Test no bonus key", () => {
    const bonusList = getBonusesFromInput(inputNoBonusKey);
    expect(bonusList.length).toEqual(0);
  });
});

const propertyInputs: string[] = ["zone", "area", "prey"];

describe("test getPropertyFromInput", () => {
  userInputPropertyTests.forEach((testCase) => {
    test(testCase.name, () => {
      propertyInputs.forEach((property) => {
        const propertyValue = getPropertyFromInput(testCase.input, property);
        expect(propertyValue).toEqual(
          testCase.expected[property as keyof typeof testCase.expected]
        );
      });
    });
  });
});

const characterProperties = [
  "activity",
  "zone",
  "area",
  "id",
  "name",
  "bonuses",
];

describe("test createCharacterFromInput", () => {
  userInputs.forEach((testCase) => {
    test(testCase.name, () => {
      const character = createCharacterFromInput(testCase.input) as Character;
      characterProperties.forEach((property) => {
        expect(character).toHaveProperty(property);
        if (property === "bonuses") {
          expect(character.bonuses.length).toBeGreaterThan(0);
        }
      });
    });
  });
  badUserInputs.forEach((testCase) => {
    test(testCase.name, () => {
      const characterErrorMessage = createCharacterFromInput(testCase.input);
      expect(characterErrorMessage).toEqual(testCase.expected);
    });
  });
});

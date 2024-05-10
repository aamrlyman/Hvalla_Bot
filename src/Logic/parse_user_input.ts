import { Activity, Bonus, Character } from "../Data/character_info";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { parse } from "path";
import { userInputs } from "../../tests/user_input_testcases";
import { get } from "http";

// function parseUserInput(input: string): void {
//   const inputParsedByLines = input.split("\n").map((line) => line.trim());
//   console.log(inputParsedByLines);
//   const activity = inputParsedByLines[0];
//   const zone = inputParsedByLines[2].split(":")[1];
//   const area = inputParsedByLines[3].split(":")[1];
//   const character = inputParsedByLines[4].split(": ")[1];
//   //   const bonuses = inputParsedByLines[5].split(": ")[1].split(", ");
// }

export const activities: Activity[] = [
  Activity.EXPLORING,
  Activity.HUNTING,
  Activity.SCAVENGING,
];

export function getActivityFromInput(input: string): Activity | undefined {
  const activityString: string = input
    .split("\n")
    .filter((line) => line !== "")[0];
  const activityEnum = activities.find(function (activityEnum) {
    console.log(activityEnum.valueOf().substring(0, 3));
    return (
      activityEnum.valueOf().substring(0, 3) ===
      activityString.trim().toUpperCase().substring(0, 3)
    );
    console.log(activityString.trim().toUpperCase().substring(0, 3));
  });
  console.log(activityEnum);
  return activityEnum;
}

export function getPropertyFromInput(
  input: string,
  property: string
): string | undefined {
  const propertyKeyAndValueString = input
    .split("\n")
    .filter((line) => line.toLowerCase().includes(property.toLowerCase()))[0];
  if (!propertyKeyAndValueString && property === "prey") {
    return;
  }
  if (!propertyKeyAndValueString && property !== "prey") {
    return;
  }
  if (!propertyKeyAndValueString.includes(":")) {
    return;
  }
  return propertyKeyAndValueString.split(":")[1].trim();
}
const bonuses = [Bonus.SCREECHOWL, Bonus.FGBONUS, Bonus.GREYOWL, Bonus.RAVEN];

export function getBonusesFromInput(input: string): Bonus[] {
  let bonusList: Bonus[] = [];
  const inputStringToList = input.split("\n");
  for (const line of inputStringToList) {
    const bonus = getBonusFromLine(line);
    if (bonus) {
      bonusList.push(bonus);
    }
  }
  return bonusList;
}

function getBonusFromLine(inputLine: string): Bonus | undefined {
  for (const bonus of bonuses) {
    if (bonus.valueOf().toLowerCase() === inputLine.trim().toLowerCase()) {
      return bonus;
    }
  }
}
interface CharacterCheck {
  name: string | undefined;
  zone: string | undefined;
  activity: string | undefined;
  id: string | undefined;
  area: string | undefined;
  bonuses: string[] | undefined;
  prey?: string | null | undefined;
}

export function createCharacterFromInput(input: string): Character | string {
  const parsedValues: CharacterCheck = {
    activity: getActivityFromInput(input),
    zone: getPropertyFromInput(input, "zone"),
    area: getPropertyFromInput(input, "area"),
    id: getPropertyFromInput(input, "id")?.split(" ")[0],
    name: getPropertyFromInput(input, "name")?.split(" ")[1],
    bonuses: getBonusesFromInput(input),
    prey: getPropertyFromInput(input, "prey"),
  };
  for (const key in parsedValues) {
    if (!parsedValues[key as keyof CharacterCheck] && key !== "prey") {
      return `Invalid ${key}, ${parsedValues[key as keyof CharacterCheck]}`;
    }
  }
  return parsedValues as Character;
}

const bob = userInputs[0].input;
const bobParsed = createCharacterFromInput(bob);

console.log(bobParsed, "asdsww ddsaawwesww ea");

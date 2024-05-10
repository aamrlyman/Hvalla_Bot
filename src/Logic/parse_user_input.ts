import { Activity, Bonus, Character } from "../Data/character_info";
import { userInputs } from "../../tests/user_input_testcases";
import { get } from "http";

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
    return (
      activityEnum.valueOf().substring(0, 3) ===
      activityString.trim().toUpperCase().substring(0, 3)
    );
  });
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
  const bonusList: Bonus[] = [];
  const inputStringToList = input.toLowerCase().split("\n");
  console.log(inputStringToList);
  const bonusesFromInput = inputStringToList.slice(
    inputStringToList.findIndex((line) => line.includes("bonuses")) + 1
  );
  console.log(
    "index",
    inputStringToList.findIndex((line) => line.includes("bonuses")) + 1
  );
  console.log("bonusFromInput:", bonusesFromInput);
  for (const line of bonusesFromInput) {
    console.log("line:", line);
    const bonus = bonuses.find((bonus) => {
      return line.trim().includes(bonus.valueOf().toLowerCase());
    });
    if (bonus) {
      bonusList.push(bonus);
    }
  }
  return bonusList;
}

const bones = getBonusesFromInput(userInputs[0].input);
console.log("output:", bones);

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

// const bob = userInputs[0].input;
// const bobParsed = createCharacterFromInput(bob);

// console.log(bobParsed);
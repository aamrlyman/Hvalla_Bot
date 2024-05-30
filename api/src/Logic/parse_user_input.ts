import { Activity, Bonus, Character } from "../Data/character_info";

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
    return `Error: ${property} not found. ${property} name and value must be separated by a colon ":"`;
  }
  return propertyKeyAndValueString.split(":")[1].trim().toLowerCase();
}

const bonuses = [
  Bonus.REROLL_ON_HUNTING_FAILURE,
  Bonus.HIGHER_PROBABILITY_FOR_MORE_ITEMS,
  Bonus.ADD_ITEM_FOR_HUNTING,
  Bonus.ADD_ITEM_FOR_EXPLORING,
];

export function getBonusesFromInput(input: string): Bonus[] {
  const bonusList: Bonus[] = [];
  const inputStringToList = input.toLowerCase().split("\n");
  const bonusesIndex =
    inputStringToList.findIndex((line) => line.includes("bonuses")) + 1;
  if (bonusesIndex === 0) {
    return bonusList;
  }
  const bonusesFromInput = inputStringToList.slice(bonusesIndex);
  for (const line of bonusesFromInput) {
    const bonus = bonuses.find((bonus) => {
      return line.trim().includes(bonus.valueOf().toLowerCase());
    });
    if (bonus) {
      bonusList.push(bonus);
    }
  }
  return bonusList;
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
      return `Error: ${key} not found. Check spelling and formatting.`;
    }
    if (parsedValues[key as keyof CharacterCheck]?.includes("Error")) {
      return parsedValues[key as keyof CharacterCheck] as string;
    }
  }
  return parsedValues as Character;
}

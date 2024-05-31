import { injuriesInfo } from "../Data/injuries_data";
import { threeZones } from "../Data/validation_info";
import {
  validateZoneAndArea,
  validatePrey,
  Validation,
} from "./validation_functions";
import { generateRandNum, isBonus } from "./shared_functions";
import { Activity, Bonus, Character } from "../Data/character_info";
import { OutputMessage } from "./output_logic";
import { ActivityOutCome, calculateActivityOutcome } from "./activity_outcome";
import {
  calcNumberOfItems,
  createItemQualitiesList,
  createQualitiesDiceRolesList as createQualityDiceRolesList,
  numOfItemsWithBonus,
  createCategoryDiceRolls,
  zipDiceRollsAndQualitiesList,
  createCategoryAndQualitiesList,
  createFoundItemsList,
  QualityAndCategory,
} from "./item_calculation";
import { injuryOutcome } from "./injury_outcome";
import {
  ActivityZoneData,
  Item,
  QualityAndMaxRange,
} from "../Data/activity_zone_data";
import { getActivityZoneData } from "../Data/activity_zone_data";

interface DiceRolls {
  activityOutcome: [number, number] | null;
  numOfItems: number | null;
  itemQualities: number[] | null;
  categories: number[] | null;
  itemIndexs: number[] | null;
  injury: number[] | null;
}

export function itemCalucationMain(
  character: Character,
  rolls?: DiceRolls
): string {
  const characterInfo: Validation = validateCharacterInfo(character);
  if (!characterInfo.isValid) {
    return characterInfo.message;
  }
  const activityZoneData: ActivityZoneData | string =
    getActivityZoneData(character);
  if (typeof activityZoneData === "string") {
    return activityZoneData;
  }
  const output: OutputMessage = new OutputMessage(character);

  const activity_Outcome: ActivityOutCome = activityOutcome(character, rolls);
  output.activityOutcome(activity_Outcome);

  if (activity_Outcome.isSuccess) {
    const items = calculateItems(character, activityZoneData, rolls);

    output.setItemInfo(
      items.itemQuantity,
      items.itemQualitiesList,
      items.foundItems
    );
  }
  const injury: string = injuryInfo(rolls);
  output.setInjury(injury);

  return output.formatOutput();
}

function validateCharacterInfo(character: Character) {
  const location = validateZoneAndArea(
    character.zone,
    character.area,
    threeZones
  );
  if (!location.isValid) {
    return location;
  }
  const preyValidation = validatePrey(character, threeZones);
  if (!preyValidation.isValid) {
    return preyValidation;
  }
  return { isValid: true, message: "Valid character info" };
}

function activityOutcome(character: Character, rolls?: DiceRolls) {
  const activityOutcomeRolls: [number, number] = rolls?.activityOutcome ?? [
    generateRandNum(),
    generateRandNum(),
  ];
  const activity_Outcome: ActivityOutCome = calculateActivityOutcome(
    isBonus(character.bonuses, Bonus.REROLL_ON_HUNTING_FAILURE),
    activityOutcomeRolls
  );

  return activity_Outcome;
}

interface ItemsInfo {
  foundItems: Item[];
  itemQuantity: number;
  itemQualitiesList: QualityAndMaxRange[];
}

function calculateItems(
  character: Character,
  activityZoneData: ActivityZoneData,
  rolls?: DiceRolls
): ItemsInfo {
  const itemQuantityRoll: number = rolls?.numOfItems ?? generateRandNum();
  const itemQuantity: number = calcNumberOfItems(
    isBonus(character.bonuses, Bonus.HIGHER_PROBABILITY_FOR_MORE_ITEMS),
    itemQuantityRoll
  );
  const itemsTotal: number = numOfItemsWithBonus(character, itemQuantity);

  const itemQualityDiceRolls: number[] =
    rolls?.itemQualities ?? createQualityDiceRolesList(itemsTotal);
  const itemQualitiesList: QualityAndMaxRange[] = createItemQualitiesList(
    activityZoneData.itemQualities,
    itemQualityDiceRolls
  );

  const categoryDiceRolls: number[] =
    rolls?.categories ?? createCategoryDiceRolls(itemQualitiesList);

  const categoryRollsAndQualitiesList = zipDiceRollsAndQualitiesList(
    categoryDiceRolls,
    itemQualitiesList
  );

  const categoryAndQualityList: QualityAndCategory[] =
    createCategoryAndQualitiesList(
      activityZoneData.itemCategoriesByQuality,
      categoryRollsAndQualitiesList
    );

  const foundItems: Item[] = createFoundItemsList(
    categoryAndQualityList,
    activityZoneData.allPossibleItems
  );
  return {
    foundItems: foundItems,
    itemQuantity: itemQuantity,
    itemQualitiesList: itemQualitiesList,
  };
}

function injuryInfo(rolls?: DiceRolls) {
  const injuryRolls: number[] = rolls?.injury ?? [
    generateRandNum(),
    generateRandNum(),
    generateRandNum(),
  ];
  const injury: string = injuryOutcome(injuryRolls, injuriesInfo);
  return injury;
}

// const bob: Character = {
//   id: "1",
//   name: "Bob",
//   zone: "thuelheim mountains",
//   area: "Chyger Town",
//   activity: Activity.EXPLORING,
//   bonuses: ["Forn Gavir"],
// };

// let output = main(bob);
// console.log(output);

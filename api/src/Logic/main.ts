import { injuriesTableData } from "../Data/injuries_data";
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
import { getItems } from "./item_calculation";
import { injuryOutcome } from "./injury_outcome";
import { Categories } from "../Data/activity_zone_data";
import { getActivityZoneData } from "../Data/activity_zone_data";

export function main(
  character: Character,
  diceRoller: CallableFunction
): string {
  const characterInfo: Validation = validateCharacterInfo(character);
  if (!characterInfo.isValid) {
    return characterInfo.message;
  }
  const activityZoneData: Categories | string = getActivityZoneData(character);
  if (typeof activityZoneData === "string") {
    return activityZoneData;
  }
  const output: OutputMessage = new OutputMessage(character);

  const activity_Outcome: ActivityOutCome = activityOutcome(
    character,
    diceRoller
  );
  output.activityOutcome(activity_Outcome);

  if (activity_Outcome.isSuccess) {
    const items = getItems(character, activityZoneData, diceRoller);

    output.setItemInfo(items);
    const injury: string = injuryOutcome(diceRoller, injuriesTableData);
    output.setInjury(injury);
  }
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

function activityOutcome(character: Character, diceRoller: CallableFunction) {
  const activity_Outcome: ActivityOutCome = calculateActivityOutcome(
    isBonus(character.bonuses, Bonus.REROLL_ON_HUNTING_FAILURE),
    diceRoller
  );

  return activity_Outcome;
}

const bob: Character = {
  id: "1",
  name: "Bob",
  zone: "thuelheim mountains",
  area: "Chyger Town",
  activity: Activity.EXPLORING,
  bonuses: ["Forn Gavir"],
};

let output = main(bob, generateRandNum);
console.log(output);

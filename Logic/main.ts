import { injuriesInfo } from "../Data/injuries_data"; 
import { threeZones } from "../Data/Validation_info";
import { validateZoneAndArea, validatePrey } from "./validation_Functions";
import { generateRandNum } from "./shared_functions";
import { Activity, Character } from "../Data/Character_info";
import { OutputMessage } from "./output_logic";
import { ActivityOutCome, calculateActivityOutcome } from "./activity_outcome";
import { Bonus, isBonus } from "./shared_functions";
import {
  calcNumberOfItems,
  createItemQualitiesList,
  createDiceRolesList,
  numOfItemsWithBonus,
  createCategoryDiceRolls,
  zipDiceRollsAndQualitiesList,
  createCategoryAndQualitiesList,
  createFoundItemsList
} from "./item_calculation";
import { QualityAndMaxRange, itemQualitiesByActivity } from "../Data/item_qualities";
import { explorationCategoriesByQuality } from "../Data/item_categories";
import { injuryOutcome } from "./injury_outcome";


interface DiceRolls {
  activityOutcome: [number, number] | null;
  numOfItems: number | null;
  itemQualities: number[] | null;
  categories: number[] | null;
  itemIndexs: number[] | null;
  injury: number[] | null;
}

function main(character: Character, roll?: DiceRolls): string {
  const location = validateZoneAndArea(
    character.zone,
    character.area,
    threeZones
  );
  if (!location.isValid) {
    return location.message;
  }
  const preyValidation = validatePrey(character, threeZones);
  if (!preyValidation.isValid) {
    return preyValidation.message;
  }

  const output: OutputMessage = new OutputMessage(character);

  const activityOutcomeRolls: [number, number] = roll?.activityOutcome ?? [
    generateRandNum(),
    generateRandNum(),
  ];
  const activity_Outcome: ActivityOutCome = calculateActivityOutcome(
    isBonus(character.bonuses, Bonus.FGBONUS),
    activityOutcomeRolls
  );
  output.activityOutcome(activity_Outcome);

  if (activity_Outcome.isSuccess) {
    const itemQuantityRoll: number = roll?.numOfItems ?? generateRandNum();
    const itemQuantity: number = calcNumberOfItems( isBonus(character.bonuses, Bonus.FGBONUS), itemQuantityRoll);
    const itemsTotal: number = numOfItemsWithBonus(character, itemQuantity);

    const itemQualityDiceRolls: number[] = roll?.itemQualities ?? createDiceRolesList(itemsTotal);
    const itemQualitiesList: QualityAndMaxRange[] = createItemQualitiesList(
      itemQualitiesByActivity[character.activity].ranges,
      itemQualityDiceRolls
    );

    const categoryDiceRolls: number[] =
      roll?.categories ??
      createCategoryDiceRolls(itemQualitiesList);
    const categoryRollsAndQualitiesList = zipDiceRollsAndQualitiesList(
      categoryDiceRolls,
      itemQualitiesList
    );
    const categoryAndQualityList =
      createCategoryAndQualitiesList(
        explorationCategoriesByQuality,
        categoryRollsAndQualitiesList
      );
    const foundItems = createFoundItemsList(
      categoryAndQualityList
    );

    output.setItemInfo(itemQuantity, itemQualitiesList, foundItems);
  }

  const injuryRolls: number[] = roll?.injury ?? [
    generateRandNum(),
    generateRandNum(),
    generateRandNum(),
  ];
  const injury: string = injuryOutcome(injuryRolls, injuriesInfo);
  output.setInjury(injury);

  return output.formatOutput();
}

const bob:Character = { id: "1", name: "Bob", zone: "thuelheim mountains", area: "Chyger Town", activity: Activity.EXPLORING, bonuses: ["Forn Gavir"] };
 main(bob);

 let output = main(bob)
 console.log(output)

// Import necessary modules and data
import { injuriesInfo } from "../Data/injuries"; // Assuming 'InjuriesInfo' is exported from './Data/injuries'
import { threeZones } from "../Data/Validation_info";
import { validate_zone_and_area, validate_prey } from "./validation_Functions";
import { generate_rand_num } from "./shared_functions";
import { Activity, Character } from "../Data/Character_info";
import { OutputMessage } from "./output_logic";
import { ActivityOutCome, activity_outcome } from "./activity_outcome";
import { Bonus, isBonus } from "./shared_functions";
import {
  calc_number_of_items,
  create_item_qualities_list,
  create_dice_roles_List,
  num_of_items_with_bonus,
  create_item_category_dice_rolls,
  zip_dice_rolls_and_qualities_list,
  create_items_quality_and_categories_list,
  create_found_items_list
} from "./item_calculation";
import { QualityAndMaxRange, ItemQualitiesByActivity } from "../Data/item_qualities";
import { exploration_items_and_categories } from "../Data/item_categories";
import { injury_outcome } from "./injury_outcome";


interface DiceRolls {
  activity_outcome?: [number, number] | null;
  num_of_items?: number | null;
  item_qualities?: number[] | null;
  item_categories?: number[] | null;
  item_indexs?: number[] | null;
  injury?: number[] | null;
}

// Define the main function
function main(character: Character, roll?: DiceRolls): string {
  const location = validate_zone_and_area(
    character.zone,
    character.area,
    threeZones
  );
  if (!location.is_valid) {
    return location.message;
  }
  const preyValidation = validate_prey(character, threeZones);
  if (!preyValidation.is_valid) {
    return preyValidation.message;
  }

  const output: OutputMessage = new OutputMessage(character);

  const activity_outcome_rolls: [number, number] = roll?.activity_outcome ?? [
    generate_rand_num(),
    generate_rand_num(),
  ];
  const activity_Outcome: ActivityOutCome = activity_outcome(
    isBonus(character.bonuses, Bonus.FGBONUS),
    activity_outcome_rolls
  );
  output.activityOutcome(activity_Outcome);

  if (activity_Outcome.isSuccess) {
    const num_of_items_roll: number = roll?.num_of_items ?? generate_rand_num();
    const num_of_items: number = calc_number_of_items( isBonus(character.bonuses, Bonus.FGBONUS), num_of_items_roll);
    const total_items: number = num_of_items_with_bonus(character, num_of_items);

    const item_quality_dice_rolls: number[] = roll?.item_qualities ?? create_dice_roles_List(total_items);
    const item_qualities_list: QualityAndMaxRange[] = create_item_qualities_list(
      ItemQualitiesByActivity[character.activity].ranges,
      item_quality_dice_rolls
    );

    const item_category_dice_rolls: number[] =
      roll?.item_categories ??
      create_item_category_dice_rolls(item_qualities_list);
    const dice_rolls_and_qualities_list = zip_dice_rolls_and_qualities_list(
      item_category_dice_rolls,
      item_qualities_list
    );
    const items_quality_and_category_list =
      create_items_quality_and_categories_list(
        exploration_items_and_categories,
        dice_rolls_and_qualities_list
      );
    const found_items = create_found_items_list(
      items_quality_and_category_list
    );

    output.setItemInfo(num_of_items, item_qualities_list, found_items);
  }

  const injury_rolls: number[] = roll?.injury ?? [
    generate_rand_num(),
    generate_rand_num(),
    generate_rand_num(),
  ];
  const injury: string = injury_outcome(injury_rolls, injuriesInfo);
  output.setInjury(injury);

  return output.formatOutput();
}

const bob:Character = { id: "1", name: "Bob", zone: "thuelheim mountains", area: "Chyger Town", activity: Activity.EXPLORING, bonuses: ["Forn Gavir"] };
 main(bob);

 let output = main(bob)
 console.log(output)

import {
  generate_rand_num,
  value_range_mapper,
  isBonus,
  Bonus,
} from "./shared_functions";
import { Character } from "../Data/Character_info";
import { item_quantity_ranges } from "../Data/item_quantity_ranges";
import {
  ItemQualitiesByActivity,
  QualityAndMaxRange,
  ItemQualities,
} from "../Data/item_qualities";

import { ItemQualitiesAndCategoriesByActivity } from "../Data/item_categories";

export function calc_number_of_items(
  fgBonus: boolean,
  diceRole: number
): number {
  const ranges = fgBonus
    ? item_quantity_ranges.bonusList
    : item_quantity_ranges.defaultList;
  const num_of_items = value_range_mapper(diceRole, ranges);
  return num_of_items;
}

export function num_of_items_with_bonus(
  character: Character,
  base_num_of_items: number
): number {
  const bonuses = character.bonuses;
  const activity = character.activity;
  const bonus =
    (isBonus(bonuses, Bonus.RAVEN) && activity === "EXPLORING") ||
    (isBonus(bonuses, Bonus.GREYOWL) && activity === "HUNTING");
  return bonus ? base_num_of_items + 1 : base_num_of_items;
}

export function create_item_qualities_list(
  range_map: { [key: number]: QualityAndMaxRange },
  dice_rolls: number[]
): QualityAndMaxRange[] {
  const items: QualityAndMaxRange[] = [];
  for (const roll of dice_rolls) {
    const item_quality = value_range_mapper<QualityAndMaxRange>(
      roll,
      range_map
    );
    items.push(item_quality);
  }
  return items;
}

export function create_dice_roles_List(
  num_of_items_with_bonus: number,
  max_roll_value: number = 100
): number[] {
  const dice_rolls: number[] = [];
  for (let i = 0; i < num_of_items_with_bonus; i++) {
    dice_rolls.push(generate_rand_num(max_roll_value));
  }
  return dice_rolls;
}

class DiceRollAndItemQuality {
  diceroll: number;
  quality: string;

  constructor(diceroll: number, quality: string) {
    this.diceroll = diceroll;
    this.quality = quality;
  }
}

export function create_item_category_dice_rolls(
  item_qualities_list: QualityAndMaxRange[]
): number[] {
  const dice_rolls: number[] = [];
  for (const item of item_qualities_list) {
    dice_rolls.push(generate_rand_num(item.max_range));
  }
  return dice_rolls;
}

export function zip_dice_rolls_and_qualities_list(
  dice_rolls: number[],
  item_qualities_list: QualityAndMaxRange[]
): DiceRollAndItemQuality[] {
  if (dice_rolls.length !== item_qualities_list.length) {
    throw new Error(
      `Lists should be the same length. Dice_roles has length: ${dice_rolls.length}, and item_qualities_list has length ${item_qualities_list.length}`
    );
  }

  const dice_rolls_and_qualities_list: DiceRollAndItemQuality[] = [];
  for (let i = 0; i < dice_rolls.length; i++) {
    dice_rolls_and_qualities_list.push(
      new DiceRollAndItemQuality(dice_rolls[i], item_qualities_list[i].quality)
    );
  }
  return dice_rolls_and_qualities_list;
}

class ItemQualityAndCategory {
  quality: string;
  category: string;

  constructor(quality: string, category: string) {
    this.quality = quality;
    this.category = category;
  }
}

export function create_items_quality_and_categories_list(
  Activity_info: ItemQualitiesAndCategoriesByActivity,
  dice_rolls_and_qualities_list: DiceRollAndItemQuality[]
): ItemQualityAndCategory[] {
  const items_qaulity_and_category_list: ItemQualityAndCategory[] = [];
  for (const roll_and_quality of dice_rolls_and_qualities_list) {
    const quality:string = roll_and_quality.quality;
    const dice_roll = roll_and_quality.diceroll;
    const category_and_category = value_range_mapper<string>(
      dice_roll,
      Activity_info.category_ranges_by_quality[quality].ranges
    );
    const quality_and_category = new ItemQualityAndCategory(
      quality,
      category_and_category
    );
    items_qaulity_and_category_list.push(quality_and_category);
  }
  return items_qaulity_and_category_list;
}


export class ItemsFound {
  name: string;
  id: string;
  url: string | null;

  constructor(name: string, id: string, url: string | null = null) {
    this.name = name;
    this.id = id;
    this.url = url;
  }
}

export function create_found_items_list(
  items_qaulity_and_category_list: ItemQualityAndCategory[]
): ItemsFound[] {
  const found_items: ItemsFound[] = [];

  for (const item of items_qaulity_and_category_list) {
  }
  return found_items;
}

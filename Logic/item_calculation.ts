import {
  generateRandNum,
  valueRangeMapper,
  isBonus,
  Bonus,
} from "./shared_functions";
import { Character } from "../Data/Character_info";
import { itemQuantityRanges } from "../Data/item_quantity_ranges";
import {
  itemQualitiesByActivity,
  QualityAndMaxRange,
  ItemQualities,
} from "../Data/item_qualities";

import { ItemCategoriesByQuality } from "../Data/item_categories";

export function calcNumberOfItems(
  fgBonus: boolean,
  diceRole: number
): number {
  const ranges = fgBonus
    ? itemQuantityRanges.bonusList
    : itemQuantityRanges.defaultList;
  const numOfItems = valueRangeMapper(diceRole, ranges);
  return numOfItems;
}

export function numOfItemsWithBonus(
  character: Character,
  baseNumOfItems: number
): number {
  const bonuses = character.bonuses;
  const activity = character.activity;
  const bonus =
    (isBonus(bonuses, Bonus.RAVEN) && activity === "EXPLORING") ||
    (isBonus(bonuses, Bonus.GREYOWL) && activity === "HUNTING");
  return bonus ? baseNumOfItems + 1 : baseNumOfItems;
}

export function createItemQualitiesList(
  rangeMap: { [key: number]: QualityAndMaxRange },
  rolls: number[]
): QualityAndMaxRange[] {
  const items: QualityAndMaxRange[] = [];
  for (const roll of rolls) {
    const itemQuality = valueRangeMapper<QualityAndMaxRange>(roll, rangeMap);
    items.push(itemQuality);
  }
  return items;
}

export function createDiceRolesList(
  numOfItemsWithBonus: number,
  maxRollValue: number = 100
): number[] {
  const rolls: number[] = [];
  for (let i = 0; i < numOfItemsWithBonus; i++) {
    rolls.push(generateRandNum(maxRollValue));
  }
  return rolls;
}

class CategoryRollAndItemQuality {
  roll: number;
  quality: string;

  constructor(diceroll: number, quality: string) {
    this.roll = diceroll;
    this.quality = quality;
  }
}

export function createCategoryDiceRolls(
  itemQualitiesList: QualityAndMaxRange[]
): number[] {
  const rolls: number[] = [];
  for (const item of itemQualitiesList) {
    rolls.push(generateRandNum(item.maxRange));
  }
  return rolls;
}

export function zipDiceRollsAndQualitiesList(
  rolls: number[],
  itemQualitiesList: QualityAndMaxRange[]
): CategoryRollAndItemQuality[] {
  if (rolls.length !== itemQualitiesList.length) {
    throw new Error(
      `Lists should be the same length. rolls has length: ${rolls.length}, and itemQualitiesList has length ${itemQualitiesList.length}`
    );
  }

  const categoryRollsAndQualitiesList: CategoryRollAndItemQuality[] = [];
  for (let i = 0; i < rolls.length; i++) {
    categoryRollsAndQualitiesList.push(
      new CategoryRollAndItemQuality(
        rolls[i],
        itemQualitiesList[i].quality
      )
    );
  }
  return categoryRollsAndQualitiesList;
}

interface QualityAndCategory {
  quality: string;
  category: string;
}

export function createCategoryAndQualitiesList(
  itemCategoryByQuality: ItemCategoriesByQuality,
  categoryRollsAndQualities: CategoryRollAndItemQuality[]
): QualityAndCategory[] {
  const categoryAndQualityList: QualityAndCategory[] = [];
  for (const rollAndQuality of categoryRollsAndQualities) {
    const category = valueRangeMapper<string>(
      rollAndQuality.roll,
      itemCategoryByQuality[rollAndQuality.quality]
    );
    const categoryAndQuality: QualityAndCategory = {
      quality: rollAndQuality.quality,
      category: category,
    };
    categoryAndQualityList.push(categoryAndQuality);
  }
  return categoryAndQualityList;
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

export function createFoundItemsList(
  itemsCategoryAndQualityList: QualityAndCategory[]
): ItemsFound[] {
  const foundItems: ItemsFound[] = [];

  for (const item of itemsCategoryAndQualityList) {
  }
  return foundItems;
}

import { generateRandNum, valueRangeMapper, isBonus } from "./shared_functions";
import { Character, Bonus } from "../Data/character_info";
import { itemQuantityRanges } from "../Data/item_quantity_ranges";
import {
  QualityAndMaxRange,
  Item,
  AllPossibleItems,
} from "../Data/activity_zone_data";

import { ItemCategoriesByQuality } from "../Data/activity_zone_data";

export function calcNumberOfItems(fgBonus: boolean, diceRole: number): number {
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
    (isBonus(bonuses, Bonus.ADD_ITEM_FOR_EXPLORING) &&
      activity === "EXPLORING") ||
    (isBonus(bonuses, Bonus.ADD_ITEM_FOR_HUNTING) && activity === "HUNTING");
  const totalItems = bonus ? baseNumOfItems + 1 : baseNumOfItems;
  return totalItems;
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

export function createQualitiesDiceRolesList(
  numOfItemsWithBonus: number,
  maxRollValue: number = 100
): number[] {
  const rolls: number[] = [];
  for (let i = 0; i < numOfItemsWithBonus; i++) {
    rolls.push(generateRandNum(maxRollValue));
  }
  return rolls;
}

interface CategoryRollAndItemQuality {
  roll: number;
  quality: string;
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
    categoryRollsAndQualitiesList.push({
      roll: rolls[i],
      quality: itemQualitiesList[i].quality,
    });
  }
  return categoryRollsAndQualitiesList;
}

export interface QualityAndCategory {
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

export function createFoundItemsList(
  itemsSearchInfoList: QualityAndCategory[],
  allPossibleItems: AllPossibleItems
): Item[] {
  const foundItems: Item[] = [];

  for (const item of itemsSearchInfoList) {
    const currentItemList = allPossibleItems[item.quality][item.category];
    const includeZeroIndex = 1;
    const listIndex =
      generateRandNum(currentItemList.length) - includeZeroIndex;
    foundItems.push(currentItemList[listIndex]);
  }
  return foundItems;
}

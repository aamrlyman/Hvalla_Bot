import { Bonus } from "../Data/character_info";

export function generateRandNum(inclusiveMaxRange: number = 100): number {
  return Math.floor(Math.random() * inclusiveMaxRange) + 1;
}

export function valueRangeMapper<T>(
  numberKey: number,
  range_map: Record<number, T>
): T {
  for (const key in range_map) {
    if (numberKey <= Number(key)) {
      // object keys in .ts default to strings even with the key type set as number, so we convert it to a number
      return range_map[key];
    }
  }
  throw new Error("Dice roll for valueRangeMapper not in range");
}

export function isBonus(characterBonuses: string[], Bonus: Bonus): boolean {
  return characterBonuses.includes(Bonus.toLowerCase());
}

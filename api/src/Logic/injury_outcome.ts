import { generateRandNum, valueRangeMapper } from "./shared_functions";
import { injuriesInfo, InjuriesInfo } from "../Data/injuries_data";

export function injuryOutcome(
  rolls: [number, number, number],
  injuriesInfo: InjuriesInfo
): string {
  if (!isInjured(rolls[0], injuriesInfo.injuredThreshold)) {
    return "No Injury";
  }
  if (isMinorInjury(rolls[1], injuriesInfo.minorInjuryThreshold)) {
    return `Minor | -${generateRandNum(20)} HP`;
  } else {
    const majorInjury = valueRangeMapper(rolls[2], injuriesInfo.majorInjuries);
    return `Major - ${majorInjury}`;
  }
}

function isMinorInjury(
  diceRoll: number,
  minorInjuryThreshold: number
): boolean {
  return diceRoll <= minorInjuryThreshold;
}

function isInjured(diceRoll: number, injuredThreshold: number): boolean {
  return diceRoll <= injuredThreshold;
}

import { generateRandNum, valueRangeMapper } from "./shared_functions";
import { InjuriesTableData, injuriesTableData } from "../Data/injuries_data";

export function injuryOutcome(
  diceroller: CallableFunction,
  injuriesTableData: InjuriesTableData
): string {
  console.log("diceRoller", diceroller());
  if (!isInjured(diceroller, injuriesTableData.injuredThreshold)) {
    return "No Injury";
  }
  if (isMinorInjury(diceroller, injuriesTableData.minorInjuryThreshold)) {
    return `Minor | -${generateRandNum(20)} HP`;
  } else {
    const majorInjury = valueRangeMapper(
      diceroller(),
      injuriesTableData.majorInjuries
    );
    return `Major - ${majorInjury}`;
  }
}

function isMinorInjury(
  diceRoller: CallableFunction,
  minorInjuryThreshold: number
): boolean {
  return diceRoller() <= minorInjuryThreshold;
}

function isInjured(
  diceRoller: CallableFunction,
  injuredThreshold: number
): boolean {
  return diceRoller() <= injuredThreshold;
}

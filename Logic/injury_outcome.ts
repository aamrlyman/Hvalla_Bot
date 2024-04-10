import { generate_rand_num, value_range_mapper } from "./shared_functions";
import { injuriesInfo, InjuriesInfo } from "../Data/injuries";


export function injury_outcome(dice_rolls: number[], injuriesInfo: InjuriesInfo): string {
    if (!isInjured(dice_rolls[0], injuriesInfo.injured_threshold)) {
        return "No Injury";
    }
    if (isMinorInjury(dice_rolls[1], injuriesInfo.minor_injury_threshold)) {
        return `Minor | -${generate_rand_num(20)} HP`;
    } else {
        const majorInjury = value_range_mapper(dice_rolls[2], injuriesInfo.major_injuries);
        return `Major - ${majorInjury}`;
    }
}

function isMinorInjury(diceRoll: number, minorInjuryThreshold: number): boolean {
    return diceRoll < minorInjuryThreshold;
}

function isInjured(diceRoll: number, injuredThreshold: number): boolean {
    return diceRoll > injuredThreshold;
}

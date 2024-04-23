interface MaxRangeType{
    isInclusive: boolean;
}

export function generateRandNum(maxRangeInput: number = 100, maxRangeType:MaxRangeType = {isInclusive:true}): number {
    const maxRangeNumber = maxRangeType.isInclusive ? maxRangeInput + 1 : maxRangeInput;
    const minRangeNumber = 1;
    return Math.floor(Math.random() * (maxRangeNumber)) + minRangeNumber;
}

export function valueRangeMapper<T>(numberKey: number, range_map: Record<number, T>): T {
    for (const key in range_map) {
        if (numberKey <= Number(key)) { // object keys in .ts default to strings even with the key type set as number, so we convert it to a number
            return range_map[key];
        }
    }
    throw new Error("Dice roll for value_range_mapper not in range");
}

export enum Bonus{
    SCREECHOWL = "Screech Owl",
    FGBONUS = "Forn Gavir",
    GREYOWL = "Grey Owl",
    RAVEN = "Raven",
}

export function isBonus(characterBonuses:string[],Bonus:Bonus):boolean{
    return characterBonuses.includes(Bonus.toLowerCase());
}
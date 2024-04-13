
export function generateRandNum(rangeMax: number = 100): number {
    return Math.floor(Math.random() * (rangeMax+1)) + 1;
}

export function valueRangeMapper<T>(numberKey: number, range_map: Record<number, T>): T {
    for (const key in range_map) {
        const intKey = parseInt(key);
        if (numberKey <= intKey) {
            return range_map[intKey];
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
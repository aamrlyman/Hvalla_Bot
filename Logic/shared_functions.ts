
export function generate_rand_num(range_max: number = 100): number {
    return Math.floor(Math.random() * range_max) + 1;
}

export function value_range_mapper<T>(numberKey: number, range_map: Record<number, T>): T {
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

// class ActivityOutCome {
//     isSuccess: boolean;
//     roll: number;
//     message: string;

//     constructor(is_Success: boolean, dice_roll: number) {
//         this.isSuccess = is_Success;
//         this.roll = dice_roll;
//         this.message = is_Success ? "Success" : "Failure";
//     }
// }


// function activity_outcome(bonus: boolean, diceRoll1: number, diceRoll2: number): ActivityOutCome {
//     let outcome = is_Success_Role(diceRoll1);
//     if (bonus && !outcome.isSuccess) {
//         outcome = is_Success_Role(diceRoll2);
//     }
//     return outcome;
// }

// function is_Success_Role(diceRole: number): ActivityOutCome {
//     const success_Role = diceRole;
//     return new ActivityOutCome(success_Role > 30, success_Role);
// }


// const thuelheim_mtns = new Zone(thuelheim_mountains.name, thuelheim_mountains.areas, thuelheim_mountains.preyAnimals);
// const forest_of_gl = new Zone(forest_of_glime.name, forest_of_glime.areas, forest_of_glime.preyAnimals);
// const utgardZone = new Zone(utgard.name, utgard.areas, utgard.preyAnimals);

// const zones = new Zones(thuelheim_mtns, forest_of_gl, utgardZone);

// function validate_zone_and_area(zone: string, area: string, zones: Zones): Validation {
//     const currentZone = zones.getZone(zone);
//     if (!currentZone) {
//         return new Validation(false, `${zone} is not a valid zone`);
//     }
//     else if (!zones.isAreaValid(currentZone, area)) {
//         return new Validation(false, `${area} is not a valid area`);
//     }
//     return new Validation(true, "Valid zone and area");
// }

// function validate_prey(character: Character, zones: Zones): Validation {
//     const currentZone = zones.getZone(character.zone) as Zone
//     if (character.activity === Activity.HUNTING && character.prey === null) {
//         return new Validation(false, "Prey animal is required for hunting");
//     }
//     if (character.prey !== null && character.activity !== Activity.HUNTING) {
//         return new Validation(false, "Prey animal is only allowed for hunting activity");
//     }
//     if (character.prey !== null && character.activity === Activity.HUNTING) {
//         const isPreyValid = zones.isPreyValid(currentZone, character.prey);
//         if (!isPreyValid) {
//             return new Validation(false, `${character.prey} is not a valid prey for ${character.zone} zone`);
//         }
//     }
//     return new Validation(true, "Valid prey");
// }


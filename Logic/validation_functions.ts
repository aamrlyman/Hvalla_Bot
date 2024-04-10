import { Character, Activity } from "../Data/Character_info";
import { threeZones, Zones, Zone} from "../Data/Validation_info";

  

class Validation {
    is_valid: boolean;
    message: string;

    constructor(is_valid: boolean, message: string) {
        this.is_valid = is_valid;
        this.message = message;
    }
}

export function validate_zone_and_area(zone: string, area: string, threeZones: Zones): Validation {
    const currentZone = threeZones.getZone(zone);
    if (!currentZone) {
        return new Validation(false, `${zone} is not a valid zone`);
    }
    else if (!threeZones.isAreaValid(currentZone, area)) {
        return new Validation(false, `${area} is not a valid area`);
    }
    return new Validation(true, "Valid zone and area");
}

export function validate_prey(character: Character, threeZones: Zones): Validation {
    const currentZone = threeZones.getZone(character.zone) as Zone
    if (character.activity === Activity.HUNTING && character.prey === null) {
        return new Validation(false, "Prey animal is required for hunting");
    }
    if (character.prey !== null && character.activity !== Activity.HUNTING) {
        return new Validation(false, "Prey animal is only allowed for hunting activity");
    }
    if (character.prey !== null && character.activity === Activity.HUNTING) {
        const isPreyValid = threeZones.isPreyValid(currentZone, character.prey);
        if (!isPreyValid) {
            return new Validation(false, `${character.prey} is not a valid prey for ${character.zone} zone`);
        }
    }
    return new Validation(true, "Valid prey");
}


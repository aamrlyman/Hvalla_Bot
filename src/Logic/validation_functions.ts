import { Character, Activity } from "../Data/character_info";
import { Zones, Zone} from "../Data/validation_info";

  

class Validation {
    isValid: boolean;
    message: string;

    constructor(isValid: boolean, message: string) {
        this.isValid = isValid;
        this.message = message;
    }
}

export function validateZoneAndArea(zone: string, area: string, threeZones: Zones): Validation {
    const currentZone = threeZones.getZone(zone);
    if (!currentZone) {
        return new Validation(false, `${zone} is not a valid zone`);
    }
    else if (!threeZones.isAreaValid(currentZone, area)) {
        return new Validation(false, `${area} is not a valid area`);
    }
    return new Validation(true, "Valid zone and area");
}

export function validatePrey(character: Character, threeZones: Zones): Validation {
    const currentZone = threeZones.getZone(character.zone) as Zone
    if (character.activity === Activity.HUNTING && character.prey === null) {
        return new Validation(false, "Prey animal is required for hunting");
    }
    if (character.prey && character.activity !== Activity.HUNTING) {
        return new Validation(false, "Prey animal is only allowed for hunting activity");
    }
    if (character.prey && character.activity === Activity.HUNTING) {
        const isPreyValid = threeZones.isPreyValid(currentZone, character.prey);
        if (!isPreyValid) {
            return new Validation(false, `${character.prey} is not a valid prey for ${character.zone} zone`);
        }
    }
    return new Validation(true, "Valid prey");
}


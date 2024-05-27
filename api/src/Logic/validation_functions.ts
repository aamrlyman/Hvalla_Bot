import { Character, Activity } from "../Data/character_info";
import { Zones, Zone } from "../Data/validation_info";

export interface Validation {
  isValid: boolean;
  message: string;
}

export function validateZoneAndArea(
  zone: string,
  area: string,
  threeZones: Zones
): Validation {
  const currentZone = threeZones.getZone(zone);
  if (!currentZone) {
    return { isValid: false, message: `${zone} is not a valid zone` };
  } else if (!threeZones.isAreaValid(currentZone, area)) {
    return { isValid: false, message: `${area} is not a valid area` };
  }
  return { isValid: true, message: "Valid zone and area" };
}

export function validatePrey(
  character: Character,
  threeZones: Zones
): Validation {
  const currentZone = threeZones.getZone(character.zone) as Zone;
  if (
    character.activity === Activity.HUNTING &&
    (character.prey === null || character.prey === undefined)
  ) {
    return { isValid: false, message: "Prey animal is required for hunting" };
  }
  if (character.prey && character.activity !== Activity.HUNTING) {
    return {
      isValid: false,
      message: "Prey animal is only allowed for hunting activity",
    };
  }
  if (character.prey && character.activity === Activity.HUNTING) {
    const isPreyValid = threeZones.isPreyValid(currentZone, character.prey);
    if (!isPreyValid) {
      return {
        isValid: false,
        message: `${character.prey} is not a valid prey for ${character.zone} zone`,
      };
    }
  }
  return { isValid: true, message: "Valid prey" };
}

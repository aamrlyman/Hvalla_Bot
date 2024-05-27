// Define TypeScript objects representing the zone data
export interface Zone {
  name: string;
  areas: string[];
  preyAnimals: string[];
}

export class Zones {
  thuheim_mountains: Zone;
  forest_of_glime: Zone;
  utgard: Zone;

  constructor(zone1: Zone, zone2: Zone, zone3: Zone) {
    this.thuheim_mountains = zone1;
    this.forest_of_glime = zone2;
    this.utgard = zone3;
  }

  getZone(zone: string): Zone | false {
    zone = zone.toLowerCase();
    switch (zone) {
      case "thuelheim mountains":
        return this.thuheim_mountains;
      case "forest of glime":
        return this.forest_of_glime;
      case "utgard":
        return this.utgard;
      default:
        return false;
    }
  }

  isAreaValid(zone: Zone, area: string): boolean {
    area = area.toLowerCase();
    return zone.areas.some((valid_area) => valid_area.toLowerCase() === area);
  }

  isPreyValid(zone: Zone, prey: string): boolean | null {
    prey = prey.toLowerCase();
    return zone.preyAnimals.some(
      (valid_prey) => valid_prey.toLowerCase() === prey
    );
  }
}

const thuelheim_mountains: Zone = {
  name: "thuelheim mountains",
  areas: [
    "Chyger Town",
    "Coalminster",
    "Highpoint Village",
    "Village Highpoint Tower",
  ],
  preyAnimals: ["Caribou", "Fox", "Grunox"],
};

const forest_of_glime: Zone = {
  name: "forest of glime",
  areas: [
    "Ljosa-Ekk Settlement",
    "The Great Root",
    "Eastern Ley-Well",
    "Western Ley-Well",
    "The Sapling Stone",
    "The Shadows",
  ],
  preyAnimals: ["Arthro", "Gryllo", "Clipper Ant"],
};

const utgard: Zone = {
  name: "utgard",
  areas: [
    "Giants Run",
    "Heilagr Heights",
    "Ravenstone Village",
    "Rinalen",
    "Riverford Lodge",
    "Skyhold",
    "Stormwatch",
    "Vigrith",
    "Vimur Village",
  ],
  preyAnimals: ["Goat", "Elk", "Deer"],
};

export const threeZones = new Zones(
  thuelheim_mountains,
  forest_of_glime,
  utgard
);

export enum Activity {
  HUNTING = "HUNTING",
  EXPLORING = "EXPLORING",
  SCAVENGING = "SCAVENGING",
}

export enum Bonus {
  REROLL_ON_HUNTING_FAILURE = "Screech Owl",
  HIGHER_PROBABILITY_FOR_MORE_ITEMS = "Forn Gevir",
  ADD_ITEM_FOR_HUNTING = "Grey Owl",
  ADD_ITEM_FOR_EXPLORING = "Raven",
}

export type ZoneType = "forest of glime" | "thuelheim mountains" | "utgard";
export type PreyType =
  | "Arthro"
  | "Clipper Ant"
  | "Gryllo"
  | "Caribou"
  | "Fox"
  | "Grunox"
  | "Goat"
  | "Elk"
  | "Deer";

export interface Character {
  name: string;
  zone: ZoneType;
  activity: Activity;
  id: string;
  area: string;
  bonuses: string[];
  prey?: PreyType;
}

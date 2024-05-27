export enum Activity {
  HUNTING = "HUNTING",
  EXPLORING = "EXPLORING",
  SCAVENGING = "SCAVENGING",
}

export enum Bonus {
  SCREECHOWL = "Screech Owl", // Reroll for HUNTING if failure
  FGBONUS = "Forn Gavir", // Increases likelihood of MORE items
  GREYOWL = "Grey Owl", // If successful, add ONE item for HUNTING
  RAVEN = "Raven", // If successful, add ONE item for EXPLORATION
}

export type ZoneType = "forest of glime" | "thuelheim mountains" | "utgard";
export type PreyType =
  | "arthro"
  | "clipper ant"
  | "gryllo"
  | "caribou"
  | "fox"
  | "grunox"
  | "goat"
  | "elk"
  | "deer";

export interface Character {
  name: string;
  zone: ZoneType;
  activity: Activity;
  id: string;
  area: string;
  bonuses: string[];
  prey?: PreyType;
}

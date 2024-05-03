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

export interface Character {
  name: string;
  zone: string;
  activity: string;
  id: string;
  area: string;
  bonuses: string[];
  prey?: string | null;
}

import { getActivityZoneData } from "../src/Data/activity_zone_data";
import { expect, test, describe } from "@jest/globals";

import { Character, Bonus } from "../src/Data/character_info";
import { Activity } from "../src/Data/character_info";

const characterExploring: Character = {
  name: "Ragnar",
  zone: "thuelheim mountains",
  activity: Activity.EXPLORING,
  area: "chyger town",
  id: "12ads",
  bonuses: ["Raven"],
};
const characterScavenging: Character = {
  name: "Bob",
  zone: "thuelheim mountains",
  activity: Activity.SCAVENGING,
  area: "Coalminster",
  id: "312ads",
  bonuses: ["Forn Gavir"],
};
const characterHunting: Character = {
  name: "Bob",
  zone: "thuelheim mountains",
  activity: Activity.HUNTING,
  area: "Coalminster",
  id: "312ads",
  prey: "Fox",
  bonuses: ["Forn Gavir"],
};

interface CharacterAndFileName {
  info: Character;
  fileName: string;
}

const characters: CharacterAndFileName[] = [
  { info: characterExploring, fileName: "thuelheim_mountains_exploring" },
  // { info: characterHunting, fileName: "thuelheim_mountains_hunting" },
  // {
  //   info: characterScavenging,
  //   fileName: "thuelheim_mountains_scavenging",
  // },
  // UNCOMMENT THIS LINE WHEN DATA FILES ARE ADDED
];

describe("test getActivityZoneData function", () => {
  test("make sure getActivityZoneData can get nested items from yaml", () => {
    for (const character of characters) {
      const data = getActivityZoneData(character.info);
      expect(data).not.toBeNull();
      expect(data).not.toBeUndefined();
      expect(data).toHaveProperty("itemQualities");
      expect(data).toHaveProperty("itemCategoriesByQuality");
      expect(data).toHaveProperty("allPossibleItems");
    }
  });
});

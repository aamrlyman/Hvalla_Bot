import {
  getActivityFromInput,
  activities,
} from "../src/logic/parse_user_input";

import { Character, Bonus } from "../src/Data/character_info";
import { Activity } from "../src/Data/character_info";

export const userInputs = [
  `EXPLORING

Zone: Thuelheim Mountains
Important Area: Hallen Stone
Character ID and Name: W28 Sigelblyse
Activity-specific Bonuses: 
- Forn Gevir
- Raven `,
  `HUNTING

Zone: Forest of Lime
Important Area: Eastern Ley-Well
Prey: Clipper Ant
Character ID and Name: W8 Morioch
Activity-specific Bonuses: 
- Forn Gevir
- Screech Owl`,

  `SCAVENGING

Zone: Utgard
Important Area: Ravenstone Village
Character ID and Name: W69 Fellheim
Activity-specific Bonuses: 
- Forn Gevir`,

  `SCAVENGING 

Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim 
Activity-specific Bonuses: 
- Forn Gevir`,
  `
SCAVENGING 

Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim 
Activity-specific Bonuses: 
- Forn Gevir`,
  `
SCAVEGING 

Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim 
Activity-specific Bonuses: 
- Forn Gevir`,
];

describe("test getActivityFromInput", () => {
  test("Make sure function returns enum type", () => {
    for (const input of userInputs) {
      const activity = getActivityFromInput(input);
      console.log(activity);
      expect(activities).toContain(activity);
    }
  });
});

// describe("test getActivityZoneData function", () => {
//   test("make sure getActivityZoneData can get nested items from yaml", () => {});
// });

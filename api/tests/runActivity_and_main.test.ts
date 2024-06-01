import { main } from "../src/Logic/main";
import { Character, Activity } from "../src/Data/character_info";
import { runActivity } from "../src/index";
import { expect, test, describe } from "@jest/globals";
import { injuryOutcome } from "../src/Logic/injury_outcome";
import { injuriesInfo } from "../src/Data/injuries_data";

const character1: Character = {
  name: "W69 Fellheim",
  id: "W69",
  zone: "thuelheim mountains",
  area: "Chyger Town",
  activity: Activity.EXPLORING,
  bonuses: ["Forn Gavir", "raven"],
};

describe("test probability distribution", () => {
  test("Make sure injury outcomes in Main are only ~30%", () => {
    let noInjuryCount: number = 0;
    for (let i = 0; i < 1001; i++) {
      const activityOutput = main(character1);
      const injuryBool = activityOutput.includes("No Injury");
      if (injuryBool) {
        noInjuryCount += 1;
      }
    }
    expect(noInjuryCount).toBeGreaterThan(600);
  });
  test("Make sure injury outcomes in runActivity are only ~30%", () => {
    let noInjuryCount: number = 0;
    for (let i = 0; i < 1001; i++) {
      const activityOutput = runActivity(`exploring
        zone: thuelheim mountains
        Important Area: Chyger Town
        Character ID and Name: W69 Fellheim
        Activity-specific Bonuses:
        - Forn Gavir
        - raven`);
      const injuryBool = activityOutput.includes("No Injury");
      if (injuryBool) {
        noInjuryCount += 1;
      }
    }
    expect(noInjuryCount).toBeGreaterThan(600);
  });

  interface InjuryCase {
    name: string;
    input: [number, number, number];
    expected: string;
  }

  const injuryCases: InjuryCase[] = [
    { name: "no injury 31", input: [31, 31, 30], expected: "No Injury" },
    { name: "minor 30", input: [30, 31, 30], expected: "Minor" },
    { name: "minor 85", input: [29, 85, 100], expected: "Minor" },
    {
      name: "major 86",
      input: [29, 86, 19],
      expected: "SPRAIN | -5 HP and -1 SP to AGILITY",
    },
  ];
  describe("Make sure injuryOutcome() works with expected benchmarks", () => {
    injuryCases.forEach((testCase) => {
      test(testCase.name, () => {
        const injury = injuryOutcome(testCase.input, injuriesInfo);
        expect(injury).toContain(testCase.expected);
      });
    });
  });
});

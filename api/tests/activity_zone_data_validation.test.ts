import { AllActivityZoneData } from "../src/Data/activity_zone_data";
import { expect, test, describe } from "@jest/globals";
import { Activity, ZoneType } from "../src/Data/character_info";
import { Zone } from "../src/Data/validation_info";
const allActivityZoneData: AllActivityZoneData = require("../src/Data/json_data/all_activity_zone_data.json");

describe(`Validate all mappings for ${Activity.EXPLORING}`, () => {
  const activityData = allActivityZoneData[Activity.EXPLORING];
  for (const zoneData in activityData) {
    const itemCategoriesByQuality =
      activityData[zoneData as ZoneType].itemCategoriesByQuality;
    const itemQualities = activityData[zoneData as ZoneType].itemQualities;
    const allPossibleItems =
      activityData[zoneData as ZoneType].allPossibleItems;
    test(`${zoneData} itemQualities map to itemCategoriesByQuality`, () => {
      for (const diceRollBenchmark in itemQualities) {
        const itemQuality = itemQualities[diceRollBenchmark]["quality"];
        expect(itemCategoriesByQuality).toHaveProperty(itemQuality);
      }
    });
    describe(`${zoneData} maxRanges map to itemCategoriesByQuality`, () => {
      for (const diceRollBenchmark in itemQualities) {
        test(`itemQualities diceRollBenchMark: ${diceRollBenchmark} maxRange maps to itemCategoriesByQuality`, () => {
          const maxRange = itemQualities[diceRollBenchmark]["maxRange"];
          const itemQuality = itemQualities[diceRollBenchmark]["quality"];
          const correspondingMaxRange = parseInt(
            Object.keys(itemCategoriesByQuality[itemQuality]).pop() as string
          );
          expect(maxRange).toEqual(correspondingMaxRange);
        });
      }
    });
    describe(`${zoneData} categories map to allPossibleItems`, () => {
      for (const itemQuality in itemCategoriesByQuality) {
        describe(`itemCategoriesByQuality: ${itemQuality} maps to allPossibleItems`, () => {
          const categoryBenchmarks = itemCategoriesByQuality[itemQuality];
          for (const benchmark in categoryBenchmarks) {
            const category = itemCategoriesByQuality[itemQuality][benchmark];
            test(`${category} maps to allPossibleItems`, () => {
              expect(
                allPossibleItems[itemQuality][category].length
              ).toBeGreaterThan(0);
            });
          }
        });
      }
    });
  }
});

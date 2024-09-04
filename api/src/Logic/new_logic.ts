import { Character, Activity, Bonus } from "../Data/character_info";
import { Item, Container, Category } from "../Data/activity_zone_data";
import { CategoriesContainer, exampleData } from "../Data/mock_data";

const character: Character = {
  name: "Ranger",
  id: "1",
  area: "The Great Root",
  activity: Activity.HUNTING,
  zone: "forest of glime",
  prey: "Arthro",
  bonuses: [Bonus.REROLL_ON_HUNTING_FAILURE],
};

function getZoneData(allData: Container, zoneDataPath: string[]): Container {
  let zoneData = allData;
  for (const path of zoneDataPath) {
    zoneData = zoneData[path] as Container;
  }
  return zoneData;
}

function getZoneDataPath(character: Character): string[] {
  const zoneDataPath: string[] = [character.activity.valueOf(), character.zone];
  if (character.prey) {
    zoneDataPath.push(character.prey);
  }
  return zoneDataPath;
}
// console.log(getZoneDataPath(character));
// console.log(getZoneData(exampleData, getZoneDataPath(character)));

function getDiceRollMaxValue(container: Container) {
  if (isCategoriesContainer(container)) {
    const categoryList = Object.values(container);
    const maxRollValue = Math.max(
      ...categoryList.map((category) => category.inclusiveMaxRoll)
    );
    console.log(maxRollValue);
    return maxRollValue;
  } else {
    console.log("Container", container);
    throw new Error("Container is not a CategoriesContainer");
  }
}

function isCategoriesContainer(
  container: Category | Container
): container is CategoriesContainer {
  if (!isCategory(container)) {
    for (const key in container) {
      if (!isCategory(container[key])) {
        return false;
      }
    }
  }
  return true;
}
function isCategory(category: Category | Container): category is Category {
  return "inclusiveMaxRole" in category;
}

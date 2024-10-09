import { Character, Activity, Bonus } from "../Data/character_info";
import { Item } from "../Data/activity_zone_data";
import {
  Category,
  Container,
  CategoryWithItems,
  Categories,
  ContainerWithCategories,
} from "../Data/activity_zone_data";
import { exampleData } from "../Data/mock_data";
import { generateRandNum } from "./shared_functions";

const character1: Character = {
  name: "Ranger",
  id: "1",
  area: "The Great Root",
  activity: Activity.HUNTING,
  zone: "forest of glime",
  prey: "Arthro",
  bonuses: [Bonus.REROLL_ON_HUNTING_FAILURE],
};
const character2: Character = {
  name: "Ranger",
  id: "1",
  area: "The Great Root",
  activity: Activity.EXPLORING,
  zone: "forest of glime",
  bonuses: [],
};

import { Activity, Bonus, Character } from "../Data/character_info";
import * as fs from "fs";
import * as yaml from "js-yaml";

const explorationInput = `EXPLORATION


Zone: Thuelheim Mountains
Important Area: Hallen Stone
Character ID and Name: W28 Sigelblyse
Activity-specific Bonuses: 
- Forn Gevir
- Raven `;

const huntingInput = `HUNTING

Zone: Forest of Lime
Important Area: Eastern Ley-Well
Prey: Clipper Ant
Character ID and Name: W8 Morioch
Activity-specific Bonuses: 
- Forn Gevir
- Screech Owl`;

const scavengingInput = `SCAVENGING

Zone: Utgard
Important Area: Ravenstone Village
Character ID and Name: W69 Fellheim
Activity-specific Bonuses: 
- Forn Gevir`;

const scavengingInput2 = `
SCAVENGING 

Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim 
Activity-specific Bonuses: 
- Forn Gevir`;

function parseUserInput(input: string): void {
  const inputParsedByLines = input.split("\n").map((line) => line.trim());
  console.log(inputParsedByLines);
  const activity = inputParsedByLines[0];
  const zone = inputParsedByLines[2].split(":")[1];
  const area = inputParsedByLines[3].split(":")[1];
  const character = inputParsedByLines[4].split(": ")[1];
  //   const bonuses = inputParsedByLines[5].split(": ")[1].split(", ");
}

function getActivityFromInput(input: string): string {
  const activity = input.split("\n")[0].trim();
  return activity;
}

function parseToYaml(input: string): Character {
  const index = input.indexOf("\n");
  const yamlString = input.slice(index + 1);
  const activity = getActivityFromInput(input);
  const inputToYaml: object = yaml.load(yamlString) as object;
  const character: Character = {
    activity: activity,
    zone: inputToYaml["Zone"],
    area: inputToYaml["Important Area"],
    id: inputToYaml["Character ID and Name"].split(" ")[0].trim(),
    name: inputToYaml["Character ID and Name"].split(" ")[1].trim(),
    bonuses: inputToYaml["Activity-specific Bonuses"],
  };
  return character;
}
// console.log(parseUserInput(explorationInput));
console.log(parseToYaml(explorationInput));

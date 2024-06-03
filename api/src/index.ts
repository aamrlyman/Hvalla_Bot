import { main } from "./Logic/main";
import { Character, Activity } from "./Data/character_info";
import { createCharacterFromInput } from "./Logic/parse_user_input";

export function runActivity(input: string): string {
  const character: Character | string = createCharacterFromInput(input);
  // console.log("character:", character);
  if (typeof character === "string") {
    return character;
  }
  return main(character);
}

console.log(
  runActivity(`exploring
    zone: forest of glime
    Important Area: The Shadows
    Character ID and Name: W69 Fellheim
    Activity-specific Bonuses:
    - Forn Gavir
    - raven`)
);

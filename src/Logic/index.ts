import { main } from "./main";
import { Character } from "../Data/character_info";
import { createCharacterFromInput } from "./parse_user_input";

export function runActivity(input: string): string {
  const character: Character | string = createCharacterFromInput(input);
  if (typeof character === "string") {
    return character;
  }
  return main(character);
}

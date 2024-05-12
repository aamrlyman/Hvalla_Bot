import { main } from "./main";
import { Character } from "../Data/character_info";
import { createCharacterFromInput } from "./parse_user_input";

export function runActivity(): string {
  const input = document.getElementById("activityInput").value;
  const character: Character | string = createCharacterFromInput(input);
  if (typeof character === "string") {
    return character;
  }
  return main(character);
}

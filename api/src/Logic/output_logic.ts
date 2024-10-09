import { Character } from "../Data/character_info";
import { ActivityOutCome } from "./activity_outcome";
import { Item } from "../Data/activity_zone_data";
import { ItemInfo } from "./item_calculation";

export class OutputMessage {
  character: Character;
  activity_outcome: ActivityOutCome | null = null;
  characterMessage: string = "";
  locationMessage: string = "";
  bonusMessage: string = "";
  outcomeMessage: string = "";
  numOfItems: number | null = null;
  itemsInfo: string = "";
  itemsFound: string = "";
  itemInfoMessage: string = "";
  injury: string = "";
  injuryMessage: string = "";

  constructor(character: Character) {
    this.character = character;
  }

  activityOutcome(outcome: ActivityOutCome): void {
    const player = this.character;
    this.activity_outcome = outcome;
    this.characterMessage = `ROLLED ${player.activity.toUpperCase()} FOR ${
      player.id
    } ${capitalizeEachWord(player.name)}`;
    this.locationMessage = `Location: ${capitalizeEachWord(
      player.zone
    )}, ${capitalizeEachWord(player.area)}`;
    this.bonusMessage = `Bonuses Applied: ${player.bonuses}`;
    this.outcomeMessage = `ACTIVITY ${this.activity_outcome.message.toLocaleUpperCase()}(${
      this.activity_outcome.roll
    })`;
  }

  setItemInfo(itemsFound: ItemInfo[]): void {
    this.numOfItems = itemsFound.length;
    this.itemsInfo = itemsFound.map((item) => item.item).join(", ");
    const itemListUnformatted = itemsFound.map((item) =>
      item.item.URL ? item.item.URL : item.item.name
    );
    this.itemsFound =
      itemListUnformatted.length === 1
        ? itemListUnformatted[0]
        : itemListUnformatted.join("\n-");
    const listStartFormatting = itemListUnformatted.length > 1 ? "\n-" : "";
    this.itemInfoMessage = `\nNumber of Items: ${this.numOfItems}\nItem Qualities: ${this.itemsInfo}\nItems Found: ${listStartFormatting}${this.itemsFound}\n`;
  }

  setInjury(injury: string): void {
    this.injury = injury;
    this.injuryMessage = `Injury: ${this.injury}`;
  }

  formatOutput(): string {
    const introMessage = `${this.characterMessage}\n${this.outcomeMessage}\n${this.locationMessage}`;
    let itemInfoMessage = "";
    let bonusMessage = "";
    if (this.activity_outcome && this.activity_outcome.isSuccess) {
      itemInfoMessage = this.itemInfoMessage;
      bonusMessage = this.bonusMessage;
    }
    return `\n${introMessage}\n${bonusMessage}${itemInfoMessage}${this.injuryMessage}`;
  }
}

function capitalucizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function capitalizeEachWord(sentence: string): string {
  return sentence
    .split(" ")
    .map((word) => capitalucizeFirstLetter(word))
    .join(" ");
}

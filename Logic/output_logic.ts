import { Character } from "../Data/Character_info";
import { ActivityOutCome } from "./activity_outcome";
import { QualityAndMaxRange } from "../Data/item_qualities";
import { ItemsFound } from "./item_calculation";

export class OutputMessage {
    character: Character;
    activity_outcome: ActivityOutCome | null = null;
    characterMessage: string = '';
    locationMessage: string = '';
    bonusMessage: string = '';
    outcomeMessage: string = '';
    numOfItems: number | null = null;
    itemQualities: string = '';
    itemsFound: string = '';
    itemInfoMessage: string = '';
    injury: string = '';
    injuryMessage: string = '';

    constructor(character: Character) {
        this.character = character;
    }

    activityOutcome(outcome: ActivityOutCome): void {
        const player = this.character;
        this.activity_outcome = outcome;
        this.characterMessage = `Rolled ${player.activity.toUpperCase()} for ${player.id} ${player.name}`;
        this.locationMessage = `in ${player.zone}: ${player.area}`;
        this.bonusMessage = `Bonuses Applied: ${JSON.stringify(player.bonuses)}`;
        this.outcomeMessage = `Activity Outcome: ${this.activity_outcome.message} (${this.activity_outcome.roll})`;
    }

    setItemInfo(num: number, items: QualityAndMaxRange[], itemsFound: ItemsFound[]): void {
        this.numOfItems = num;
        this.itemQualities = items.map(item => item.quality).join(', ');
        const itemListUnformatted = itemsFound.map(item => item.url ? item.url : item.name);
        this.itemsFound = itemListUnformatted.length === 1 ? itemListUnformatted[0] : itemListUnformatted.join('\n-');
        const listStartFormatting = itemListUnformatted.length > 1 ? '\n-' : '';
        this.itemInfoMessage = `Number of Items: ${this.numOfItems}\nItem Qualities: ${this.itemQualities}\nItems Found: ${listStartFormatting}${this.itemsFound}\n`;
    }

    setInjury(injury: string): void {
        this.injury = injury;
        this.injuryMessage = `Injury: ${this.injury}`;
    }

    formatOutput(): string {
        const introMessage = `${this.characterMessage} ${this.locationMessage}\n${this.outcomeMessage}`;
        let itemInfoMessage = '';
        if (this.activity_outcome && this.activity_outcome.isSuccess) {
            itemInfoMessage = this.itemInfoMessage;
        }
        return `\n${introMessage}\n${itemInfoMessage}${this.injuryMessage}`;
    }
}


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
    num_of_items: number | null = null;
    item_qualities: string[] = [];
    items_found: string = '';
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
        this.num_of_items = num;
        this.item_qualities = items.map(item => item.quality);
        const itemListUnformatted = itemsFound.map(item => item.url ? item.url : item.name);
        this.items_found = itemListUnformatted.length === 1 ? itemListUnformatted[0] : itemListUnformatted.join('\n-');
        const listStartFormatting = itemListUnformatted.length > 1 ? '\n-' : '';
        this.itemInfoMessage = `Number of Items: ${this.num_of_items}\nItem Qualities: ${this.item_qualities}\nItems Found: ${listStartFormatting}${this.items_found}\n`;
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

// // Example usage:
// const character: Character = {
//     id: 1,
//     name: 'John',
//     zone: 'Forest',
//     area: 'Grove',
//     activity: { value: 'exploring' },
//     bonuses: { screechOwl: { value: true }, fgBonus: { value: false } }
// };

// const outcome: ActivityOutCome = {
//     isSuccess: true,
//     roll: 75,
//     message: 'Success'
// };

// const items: QualityAndMaxRange[] = [
//     { quality: 'High', max_range: 100 },
//     { quality: 'Medium', max_range: 80 },
//     { quality: 'Low', max_range: 50 }
// ];

// const itemsFound: ItemsFound[] = [
//     { url: 'item1_url', name: 'Item 1' },
//     { url: null, name: 'Item 2' },
//     { url: 'item3_url', name: 'Item 3' }
// ];

// const output = new OutputMessage(character);
// output.activityOutcome(outcome);
// output.setItemInfo(3, items, itemsFound);
// output.setInjury('Sprained ankle');

// const formattedOutput = output.formatOutput();
// console.log(formattedOutput);

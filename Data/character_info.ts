
export enum Activity {
    HUNTING = "HUNTING",
    EXPLORING = "EXPLORING",
    SCAVENGING = "SCAVENGING"
}


export class Character {
    name: string;
    zone: string;
    activity: Activity;
    id: string;
    area: string;
    bonuses: string[];
    prey: string | null;
        }




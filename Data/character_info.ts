
export enum Activity {
    HUNTING = "HUNTING",
    EXPLORING = "EXPLORING",
    SCAVENGING = "SCAVENGING"
}


export interface Character {
    name: string;
    zone: string;
    activity: string;
    id: string;
    area: string;
    bonuses: string[];
    prey?: string | null;
        }



        

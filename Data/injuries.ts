export interface InjuriesInfo {
    injured_threshold: number;
    minor_injury_threshold: number;
    minor_injury_max: number;
    major_injuries: {
        [key: number]: string;
    };
    
}

export const injuriesInfo:InjuriesInfo = {
  injured_threshold: 30,
  minor_injury_threshold: 85,
  minor_injury_max: 20,
  major_injuries: {
    20: "SPRAIN | -5 HP and -1 SP to AGILITY",
    30: "DEFEANED | -5 HP and -1 SP to AGILITY",
    40: "CONCUSSION | -25 HP and -3 SP to INTELLECT",
    50: "FRACTURE | -10 HP and -2 SP to STRENGTH",
    60: "MINOR OPEN WOUND | -10 HP and -2 SP to STAMINA",
    68: "CURSE | -1 SP to ALL STATS",
    75: "POISON | 30 HP and -2 SP to STAMINA and -2 to AGILITY",
    84: "INTERNAL INJURY | -25 HP and -3 SP to STAMINA",
    89: "BROKEN BONE | -50 HP and -4 SP to STRENGTH",
    94: "SEVERE OPEN WOUND | -50 HP and -4 SP STAMINA",
    100: "UNSTOPPABLE BLEEDING | -50 HP and -4 SP to STAMINA and -4 SP to STRENGTH",
  },
};

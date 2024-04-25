import { ItemQualities } from './activity_zone_data';


const exploration: ItemQualities = { // 'EXPLORING',
    40: { quality: 'poor', maxRange: 105 },
    70: { quality: 'common', maxRange: 100 },
    92: { quality: 'uncommon', maxRange: 100 },
    97: { quality: 'rare', maxRange: 99 },
    100: { quality: 'epic', maxRange: 98 }
};

const hunting: ItemQualities = { // 'HUNTING',
    70: { quality: 'poor/common', maxRange: 100 },
    95: { quality: 'uncommon', maxRange: 100 },
    100: { quality: 'rare', maxRange: 100 }
};

const scavenging: ItemQualities = { // 'SCAVENGING',
    70: { quality: 'poor/common', maxRange: 100 },
    95: { quality: 'uncommon', maxRange: 100 },
    100: { quality: 'rare', maxRange: 100 }
};

export const itemQualitiesByActivity: { [key: string]: ItemQualities } = {
    'EXPLORING': exploration,
    'HUNTING': hunting,
    'SCAVENGING': scavenging
};

export interface QualityAndMaxRange {
    quality: string;
    max_range: number;
}

export class ItemQualities {
    type: string; // Assuming 'Activity' is a string enum or similar
    ranges: { [key: number]: QualityAndMaxRange };

    constructor(type: string, item_quality_ranges: { [key: number]: QualityAndMaxRange }) {
        this.type = type;
        this.ranges = item_quality_ranges;
    }
}

const exploration: ItemQualities = new ItemQualities('EXPLORING', {
    40: { quality: 'poor', max_range: 105 },
    70: { quality: 'common', max_range: 100 },
    92: { quality: 'uncommon', max_range: 100 },
    97: { quality: 'rare', max_range: 99 },
    100: { quality: 'epic', max_range: 98 }
});

const hunting: ItemQualities = new ItemQualities('HUNTING', {
    70: { quality: 'poor/common', max_range: 100 },
    95: { quality: 'uncommon', max_range: 100 },
    100: { quality: 'rare', max_range: 100 }
});

const scavenging: ItemQualities = new ItemQualities('SCAVENGING', {
    70: { quality: 'poor/common', max_range: 100 },
    95: { quality: 'uncommon', max_range: 100 },
    100: { quality: 'rare', max_range: 100 }
});

export const ItemQualitiesByActivity: { [key: string]: ItemQualities } = {
    'EXPLORING': exploration,
    'HUNTING': hunting,
    'SCAVENGING': scavenging
};

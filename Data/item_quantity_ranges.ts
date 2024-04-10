export interface ItemQuantityRange {
    [key: number]: number;
}

export interface ItemQuantityRanges {
    defaultList: ItemQuantityRange;
    bonusList: ItemQuantityRange;
}

export const item_quantity_ranges: ItemQuantityRanges = {
    defaultList: {
        13: 1,
        63: 2,
        89: 3,
        100: 4
    },
    bonusList: {
        10: 1,
        60: 2,
        85: 3,
        100: 4
    }
};


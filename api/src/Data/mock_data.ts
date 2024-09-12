export interface Item {
  name: string;
  id: string;
  URL?: string | null | undefined;
}

export type Category = CategoryWithItems | CategoryWithCategories;
export interface CategoryWithItems {
  name: string;
  inclusiveMaxRoll: number;
  items: Item[];
}

export interface CategoryWithCategories {
  name: string;
  inclusiveMaxRoll: number;
  categories: Category[];
}

export interface Container {
  [key: string]: Category[] | Container;
}
export interface ContainerOfContainer {
  [key: string]: Container;
}

export interface ContainerOfCategories {
  [key: string]: Category[];
}

export const exampleData: Container = {
  EXPLORING: {
    "forest of glime": [
      {
        name: "poor",
        inclusiveMaxRoll: 10,
        items: [
          { name: "item1", id: "1", URL: "https://www.example.com" },
          { name: "item2", id: "2", URL: "https://www.example2.com" },
        ],
      },
      {
        name: "common",
        inclusiveMaxRoll: 20,
        items: [
          { name: "item3", id: "3" },
          { name: "item4", id: "4" },
        ],
      },
      {
        name: "uncommon",
        inclusiveMaxRoll: 30,
        categories: [
          {
            name: "treasures",
            inclusiveMaxRoll: 50,
            items: [
              { name: "item5", id: "5" },
              { name: "item6", id: "6" },
            ],
          },
        ],
      },
      {
        name: "rare_finds",
        inclusiveMaxRoll: 100,
        items: [
          { name: "item7", id: "7" },
          { name: "item8", id: "8" },
        ],
      },
    ],
    utgard: [
      {
        name: "poor",
        inclusiveMaxRoll: 10,
        items: [
          { name: "item1", id: "1", URL: "https://www.example.com" },
          { name: "item2", id: "2", URL: "https://www.example2.com" },
        ],
      },
      {
        name: "common",
        inclusiveMaxRoll: 20,
        items: [
          { name: "item3", id: "3" },
          { name: "item4", id: "4" },
        ],
      },
      {
        name: "uncommon",
        inclusiveMaxRoll: 30,
        categories: [
          {
            name: "treasures",
            inclusiveMaxRoll: 50,
            items: [
              { name: "item5", id: "5" },
              { name: "item6", id: "6" },
            ],
          },
        ],
      },
      {
        name: "rare_finds",
        inclusiveMaxRoll: 100,
        items: [
          { name: "item7", id: "7" },
          { name: "item8", id: "8" },
        ],
      },
    ],
    "thuelheim mountains": [
      {
        name: "poor",
        inclusiveMaxRoll: 15,
        items: [
          { name: "item9", id: "9" },
          { name: "item10", id: "10" },
        ],
      },
      {
        name: "common",
        inclusiveMaxRoll: 60,
        categories: [
          {
            name: "dark_treasures",
            inclusiveMaxRoll: 80,
            items: [
              { name: "item11", id: "11" },
              { name: "item12", id: "12" },
            ],
          },
        ],
      },
      {
        name: "mythical_artifacts",
        inclusiveMaxRoll: 100,
        items: [
          { name: "item13", id: "13" },
          { name: "item14", id: "14" },
        ],
      },
    ],
  },
  HUNTING: {
    "forest of glime": {
      Arthro: [
        {
          name: "poor",
          inclusiveMaxRoll: 40,
          categories: [
            {
              name: "prey",
              inclusiveMaxRoll: 75,
              categories: [
                {
                  name: "Meat",
                  inclusiveMaxRoll: 100,
                  items: [
                    { name: "item1", id: "1" },
                    { name: "item2", id: "2" },
                  ],
                },
              ],
            },
            {
              name: "insects",
              inclusiveMaxRoll: 50,
              items: [
                { name: "item15", id: "15" },
                { name: "item16", id: "16" },
              ],
            },
          ],
        },
        {
          name: "common",
          inclusiveMaxRoll: 80,
          categories: [
            {
              name: "large_prey",
              inclusiveMaxRoll: 100,
              items: [
                { name: "item17", id: "17" },
                { name: "item18", id: "18" },
              ],
            },
            {
              name: "exotic_beasts",
              inclusiveMaxRoll: 120,
              items: [
                { name: "item19", id: "19" },
                { name: "item20", id: "20" },
              ],
            },
          ],
        },
      ],
    },
    "mountain of doom": {
      Snake: [
        {
          name: "lava_lakes",
          inclusiveMaxRoll: 100,
          categories: [
            {
              name: "fire_dragons",
              inclusiveMaxRoll: 200,
              items: [
                { name: "item21", id: "21" },
                { name: "item22", id: "22" },
              ],
            },
          ],
        },
        {
          name: "volcanic_minerals",
          inclusiveMaxRoll: 300,
          items: [
            { name: "item23", id: "23" },
            { name: "item24", id: "24" },
          ],
        },
      ],
    },
  },
};

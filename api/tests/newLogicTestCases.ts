import {
  exampleData,
  Item,
  Category,
  Container,
  CategoryWithItems,
  Categories,
  ContainerWithCategories,
} from "../src/Data/mock_data";

export const categoryArrayWithNestedCategories: Category[] = [
  {
    name: "poor",
    inclusiveMaxRoll: 50,
    categories: {
      list: [
        {
          name: "vendor Trash",
          inclusiveMaxRoll: 10,
          items: [
            {
              name: "VendorTrash1",
              id: "1",
              URL: "https://www.example.com",
            },
            {
              name: "VendorTrash2",
              id: "2",
              URL: "https://www.example2.com",
            },
          ],
        },
        {
          name: "armor",
          inclusiveMaxRoll: 20,
          items: [
            {
              name: "Armor1",
              id: "3",
              URL: "https://www.example3.com",
            },
            {
              name: "Armor2",
              id: "4",
              URL: "https://www.example4.com",
            },
          ],
        },
      ],
    },
  },
  {
    name: "common",
    inclusiveMaxRoll: 100,
    categories: {
      list: [
        {
          name: "weapons",
          inclusiveMaxRoll: 33,
          items: [
            {
              name: "Weapon1",
              id: "5",
              URL: "https://www.example5.com",
            },
            {
              name: "Weapon2",
              id: "6",
              URL: "https://www.example6.com",
            },
          ],
        },
        {
          name: "potions",
          inclusiveMaxRoll: 66,
          items: [
            {
              name: "Potion1",
              id: "7",
              URL: "https://www.example7.com",
            },
            {
              name: "Potion2",
              id: "8",
              URL: "https://www.example8.com",
            },
          ],
        },
      ],
    },
  },
];
export const categoryArrayWithItems: Category[] = [
  {
    name: "common",
    inclusiveMaxRoll: 100,
    items: [
      {
        name: "Weapon1",
        id: "5",
        URL: "https://www.example5.com",
      },
      {
        name: "Weapon2",
        id: "6",
        URL: "https://www.example6.com",
      },
    ],
  },
  {
    name: "poor",
    inclusiveMaxRoll: 50,
    items: [
      {
        name: "VendorTrash1",
        id: "1",
        URL: "https://www.example.com",
      },
      {
        name: "VendorTrash2",
        id: "2",
        URL: "https://www.example2.com",
      },
    ],
  },
];

export const categoryArryMissingInclusiveMaxRoll = [
  {
    name: "common",
    items: [
      {
        name: "Weapon1",
        id: "5",
        URL: "https://www.example5.com",
      },
      {
        name: "Weapon2",
        id: "6",
        URL: "https://www.example6.com",
      },
    ],
  },
  {
    name: "poor",
    items: [
      {
        name: "VendorTrash1",
        id: "1",
        URL: "https://www.example.com",
      },
      {
        name: "VendorTrash2",
        id: "2",
        URL: "https://www.example2.com",
      },
    ],
  },
];
let obj = { a: {} };
obj.a = { b: obj };
export const getMaxRollErrorCases = [
  {
    name: "Container",
    input: exampleData,
  },
  {
    name: "string",
    input: "asdf",
  },
  {
    name: "number",
    input: 12,
  },
  {
    name: "empty Array",
    input: [],
  },
  {
    name: "No inclusiveMaxRange",
    input: categoryArryMissingInclusiveMaxRoll,
  },
  {
    name: "circlular ref",
    input: obj.a,
    expected: `Converting circular structure to JSON`,
  },
];
export const getMaxRollNormalCases = [
  {
    name: "Top level ContainerWithCategories",
    input: categoryArrayWithNestedCategories,
    expected: 100,
  },
  {
    name: "categoryArrayWithItems",
    input: categoryArrayWithItems,
    expected: 100,
  },
];

export const getZoneDataTestCases = [
  {
    name: "Exploring",
    input: ["EXPLORING", "forest of glime"],
    expected: "poor",
  },
  {
    name: "Hunting",
    input: ["HUNTING", "forest of glime"],
    expected: "not a Categories Object",
    error: true,
  },
  {
    name: "Hunting",
    input: ["HUNTING", "forest of glime", "Arthro"],
    expected: "poor",
  },
];

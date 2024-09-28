import { exampleData, Category, Categories } from "../../src/Data/mock_data";

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

export const forestOfGlimeExploring: Categories = {
  list: [
    {
      name: "poor",
      inclusiveMaxRoll: 33,
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
              { name: "armor1", id: "1", URL: "https://www.example.com" },
              { name: "armor2", id: "2", URL: "https://www.example2.com" },
            ],
          },
          {
            name: "meat",
            inclusiveMaxRoll: 20,
            items: [
              { name: "meat1", id: "1", URL: "https://www.example.com" },
              { name: "meat2", id: "2", URL: "https://www.example2.com" },
            ],
          },
        ],
      },
    },
    {
      name: "common",
      inclusiveMaxRoll: 66,
      items: [
        { name: "item3", id: "3" },
        { name: "item4", id: "4" },
      ],
    },
    {
      name: "uncommon",
      inclusiveMaxRoll: 30,
      categories: {
        list: [
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
};
export const categoriesObjWithNoItems: Categories = {
  list: [
    {
      name: "poor",
      inclusiveMaxRoll: 33,
      categories: {
        list: [
          {
            name: "vendor Trash",
            inclusiveMaxRoll: 10,
            items: [],
          },
          {
            name: "armor",
            inclusiveMaxRoll: 20,
            items: [],
          },
          {
            name: "meat",
            inclusiveMaxRoll: 20,
            items: [],
          },
        ],
      },
    },
  ],
};

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

export const getCategoryWithRollValueTestCases = [
  {
    name: "nested categories list",
    inputList: categoryArrayWithNestedCategories,
    inputRollValue: 15,
    expected: "poor",
  },
  {
    name: "Should throw error with container passed in",
    inputList: exampleData,
    inputRollValue: 15,
    error: true,
    expected: "Invalid CategoryList",
  },
  {
    name: "Top level Categories List",
    inputList: forestOfGlimeExploring.list,
    inputRollValue: 15,
    expected: "poor",
  },
  {
    name: "Should throw error with roll value out of range",
    inputList: forestOfGlimeExploring.list,
    inputRollValue: 200,
    error: true,
    expected: "No category found for roll value:",
  },
];

const invalidInputError = "Invalid input:";

export const getItemTestCases = [
  {
    name: "Empty Array",
    input: [] as any,
    error: true,
    expected: invalidInputError,
    dye: () => 1,
  },
  {
    name: "Empty Object",
    input: {},
    error: true,
    expected: invalidInputError,
    dye: () => 1,
  },
  {
    name: "Container",
    input: exampleData,
    error: true,
    expected: invalidInputError,
    dye: () => 1,
  },
  {
    name: "Normal Case",
    input: forestOfGlimeExploring,
    expected: "VendorTrash1",
    dye: () => 1,
  },
  {
    name: "No Items in Category",
    error: true,
    input: categoriesObjWithNoItems,
    expected:
      "Error finding category with items at path poor:1, vendor Trash:1",
    dye: () => 1,
  },
  {
    name: "Roll value out of category range",
    error: true,
    input: categoriesObjWithNoItems,
    expected: "Error finding category with items at path",
    dye: () => 200,
  },
  {
    name: "Roll value out of category range",
    error: true,
    input: forestOfGlimeExploring,
    expected: "Error finding category with items at path",
    dye: () => 10,
  },
];

export const expected = {
  EXPLORING: {
    "forest of glime": {
      list: [
        {
          name: "poor",
          inclusiveMaxRoll: 25,
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
                  { name: "armor1", id: "3", URL: "https://www.example.com" },
                  { name: "armor2", id: "4", URL: "https://www.example2.com" },
                ],
              },
              {
                name: "meat",
                inclusiveMaxRoll: 30,
                items: [
                  { name: "meat1", id: "5", URL: "https://www.example.com" },
                  { name: "meat2", id: "6", URL: "https://www.example2.com" },
                ],
              },
            ],
          },
        },
      ],
    },
  },
};

export const input = {
  EXPLORING: {
    "forest of glime": {
      itemQualities: {
        25: {
          quality: "poor",
          maxRange: 30,
        },
      },
      itemCategoriesByQuality: {
        poor: {
          10: "vendor Trash",
          20: "armor",
          30: "meat",
        },
      },
      allPossibleItems: {
        poor: {
          "vendor Trash": [
            { name: "VendorTrash1", id: "1", URL: "https://www.example.com" },
            { name: "VendorTrash2", id: "2", URL: "https://www.example2.com" },
          ],
          armor: [
            { name: "armor1", id: "3", URL: "https://www.example.com" },
            { name: "armor2", id: "4", URL: "https://www.example2.com" },
          ],
          meat: [
            { name: "meat1", id: "5", URL: "https://www.example.com" },
            { name: "meat2", id: "6", URL: "https://www.example2.com" },
          ],
        },
      },
    },
  },
};

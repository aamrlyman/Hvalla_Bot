const input = {
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
  HUNTING: {
    "forest of glime": {
      Arthro: {
        itemQualities: {
          40: {
            quality: "poor",
            maxRange: 75,
          },
          80: {
            quality: "common",
            maxRange: 120,
          },
        },
        itemCategoriesByQuality: {
          poor: {
            50: "insects",
            75: "prey",
          },
          common: {
            100: "large_prey",
            120: "exotic_beasts",
          },
        },
        allPossibleItems: {
          poor: {
            prey: {
              Meat: [
                { name: "item1", id: "7" },
                { name: "item2", id: "8" },
              ],
            },
            insects: [
              { name: "item15", id: "15" },
              { name: "item16", id: "16" },
            ],
          },
          common: {
            large_prey: [
              { name: "item17", id: "17" },
              { name: "item18", id: "18" },
            ],
            exotic_beasts: [
              { name: "item19", id: "19" },
              { name: "item20", id: "20" },
            ],
          },
        },
      },
    },
  },
};

function transformInputToExpected(input) {
  const transformSection = (section) => {
    return Object.entries(section).reduce((result, [location, details]) => {
      const transformed = {
        [location]: {
          list: Object.entries(details.itemQualities).map(
            ([qualityMaxRoll, qualityDetails]) => ({
              name: qualityDetails.quality,
              inclusiveMaxRoll: Number(qualityMaxRoll),
              categories: {
                list: Object.entries(
                  details.itemCategoriesByQuality[qualityDetails.quality]
                ).map(([categoryMaxRoll, categoryName]) => {
                  const items =
                    details.allPossibleItems[qualityDetails.quality][
                      categoryName
                    ];

                  // If it's nested categories (like "prey" in HUNTING)
                  if (typeof items === "object" && !Array.isArray(items)) {
                    return {
                      name: categoryName,
                      inclusiveMaxRoll: Number(categoryMaxRoll),
                      categories: {
                        list: Object.entries(items).map(
                          ([subCategoryName, subCategoryItems]) => ({
                            name: subCategoryName,
                            inclusiveMaxRoll: 100, // Default max roll for nested categories
                            items: subCategoryItems,
                          })
                        ),
                      },
                    };
                  } else {
                    return {
                      name: categoryName,
                      inclusiveMaxRoll: Number(categoryMaxRoll),
                      items,
                    };
                  }
                }),
              },
            })
          ),
        },
      };
      return { ...result, ...transformed };
    }, {});
  };

  const transformed = Object.entries(input).reduce((acc, [key, section]) => {
    acc[key] = transformSection(section);
    return acc;
  }, {});

  return transformed;
}

// Transform the input to match the expected format
const result = transformInputToExpected(input);

console.log(JSON.stringify(result, null, 2));

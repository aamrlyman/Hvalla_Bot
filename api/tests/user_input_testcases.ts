export interface userInputsTestCases {
  input: string;
  name: string;
}

export const userInputs: userInputsTestCases[] = [
  {
    name: "Test 1: Exploring Standard input",
    input: `EXPLORING
  
  Zone: thuelheim mountains
  Important Area: Hallen Stone
  Character ID and Name: W28 Sigelblyse
  Activity-specific Bonuses: 
  - Forn Gevir
  - Raven `,
  },
  {
    name: "Test 2: Hunting standard input",
    input: `HUNTING
  
  Zone: Forest of Lime
  Important Area: Eastern Ley-Well
  Prey: Clipper Ant
  Character ID and Name: W8 Morioch
  Activity-specific Bonuses: 
  - Forn Gevir
  - Screech Owl`,
  },
  {
    name: "Test 3: Scavenging input",
    input: `SCAVENGING
    
    Zone: utgard
    Important Area: Ravenstone Village
    Character ID and Name: W69 Fellheim
    Activity-specific Bonuses: 
    - Forn Gevir`,
  },
  {
    name: "Test 4: Scavenging input with extra spaces",
    input: `
    SCAVENGING 
  
  Zone: utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir`,
  },
  {
    name: "Test 5: Scavenging input mispelled and lower case",
    input: `scaveging 
  
  Zone: utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir`,
  },
  {
    name: "Test 6: Scavenging input extra spaces upper and lower case",
    input: `
  ScAVaNGING 
  
  Zone: utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir`,
  },
  {
    name: "Test 7: hunting input extra spaces and mispelled",
    input: `
      huntings            
  
  Zone: utgard 
  Important Area: ravenstone village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir
  - Grey Owl`,
  },
];

export interface UserInputPropertyTestCases {
  name: string;
  input: string;
  expected: {
    zone: string;
    area: string;
    id: string;
    name: string;
    prey: string | null | undefined;
  };
}

export const userInputPropertyTests: UserInputPropertyTestCases[] = [
  {
    name: "Test 1: Hunting Standard input",
    input: `
    huntings            

Zone: utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim
prey: Goat
Activity-specific Bonuses: 
- Forn Gevir`,

    expected: {
      zone: "utgard",
      area: "ravenstone village",
      id: "W69",
      name: "Fellheim",
      prey: "goat",
    },
  },
  {
    name: "Test 2: Hunting different Order",
    input: `
    exploration            

    character id and name: SGG123 Bob 
    important Area: coalminster 
    zone: thuelheim mountains 
    Activity-specific Bonuses: 
    - Forn Gevir`,

    expected: {
      zone: "thuelheim mountains",
      area: "coalminster",
      id: "SGG123",
      name: "Bob",
      prey: undefined,
    },
  },
];

interface BadUserInput {
  name: string;
  input: string;
  expected: string;
}
export const badUserInputs: BadUserInput[] = [
  {
    name: "Test 1: hunting input extra spaces and mispelled",
    input: `
      huuntings            
  
  Zone: utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir
  - Grey Owl`,
    expected: "Error: activity not found. Check spelling and formatting.",
  },
  {
    name: "Test 2: Colon missing in zone",
    input: `
      huntings            
  
  zone utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir
  - Grey Owl`,
    expected:
      'Error: zone not found. zone name and value must be separated by a colon ":"',
  },
  {
    name: "Test 3: Colon missing in area",
    input: `
      huntings            
  
  zone: utgard 
  Important Area Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir
  - Grey Owl`,
    expected:
      'Error: area not found. area name and value must be separated by a colon ":"',
  },
  {
    name: "Test 4: Areaa mispelled",
    input: `
      huntings            
  
  zone: utgard 
  Important Axreaa: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gevir
  - Grey Owl`,
    expected: "Error: area not found. Check spelling and formatting.",
  },
];

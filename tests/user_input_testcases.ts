export interface userInputsTestCases {
  input: string;
  name: string;
}

export const userInputs: userInputsTestCases[] = [
  {
    name: "Test 1: Exploring Standard input",
    input: `EXPLORING
  
  Zone: Thuelheim Mountains
  Important Area: Hallen Stone
  Character ID and Name: W28 Sigelblyse
  Activity-specific Bonuses: 
  - Forn Gavir
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
  - Forn Gavir
  - Screech Owl`,
  },
  {
    name: "Test 3: Scavenging input",
    input: `SCAVENGING
    
    Zone: Utgard
    Important Area: Ravenstone Village
    Character ID and Name: W69 Fellheim
    Activity-specific Bonuses: 
    - Forn Gavir`,
  },
  {
    name: "Test 4: Scavenging input with extra spaces",
    input: `
    SCAVENGING 
  
  Zone: Utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir`,
  },
  {
    name: "Test 5: Scavenging input mispelled and lower case",
    input: `scaveging 
  
  Zone: Utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir`,
  },
  {
    name: "Test 6: Scavenging input extra spaces upper and lower case",
    input: `
  ScAVaNGING 
  
  Zone: Utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir`,
  },
  {
    name: "Test 7: hunting input extra spaces and mispelled",
    input: `
      huntings            
  
  Zone: Utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir
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

Zone: Utgard 
Important Area: Ravenstone Village 
Character ID and Name: W69 Fellheim
prey: Goat
Activity-specific Bonuses: 
- Forn Gavir`,

    expected: {
      zone: "Utgard",
      area: "Ravenstone Village",
      id: "W69",
      name: "Fellheim",
      prey: "Goat",
    },
  },
  {
    name: "Test 2: Hunting different Order",
    input: `
    Exploration            

    Character ID and Name: SGG123 Bob 
    Important Area: Coalminster 
    Zone: Thuelheim Mountains 
    Activity-specific Bonuses: 
    - Forn Gavir`,

    expected: {
      zone: "Thuelheim Mountains",
      area: "Coalminster",
      id: "SGG123",
      name: "Bob",
      prey: undefined,
    },
  },
];
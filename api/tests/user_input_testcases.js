"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badUserInputs = exports.userInputPropertyTests = exports.userInputs = void 0;
exports.userInputs = [
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
exports.userInputPropertyTests = [
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
    exploration            

    character id and name: SGG123 Bob 
    important Area: Coalminster 
    zone: Thuelheim Mountains 
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
exports.badUserInputs = [
    {
        name: "Test 1: hunting input extra spaces and mispelled",
        input: `
      huuntings            
  
  Zone: Utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir
  - Grey Owl`,
        expected: "Error: activity not found. Check spelling and formatting.",
    },
    {
        name: "Test 2: Colon missing in zone",
        input: `
      huntings            
  
  zone Utgard 
  Important Area: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir
  - Grey Owl`,
        expected: 'Error: zone not found. zone name and value must be separated by a colon ":"',
    },
    {
        name: "Test 3: Colon missing in area",
        input: `
      huntings            
  
  zone: Utgard 
  Important Area Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir
  - Grey Owl`,
        expected: 'Error: area not found. area name and value must be separated by a colon ":"',
    },
    {
        name: "Test 4: Areaa mispelled",
        input: `
      huntings            
  
  zone: Utgard 
  Important Axreaa: Ravenstone Village 
  Character ID and Name: W69 Fellheim 
  Activity-specific Bonuses: 
  - Forn Gavir
  - Grey Owl`,
        expected: "Error: area not found. Check spelling and formatting.",
    },
];

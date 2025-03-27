## HvallaBot

This is a custom project built for my wife's fantasy art/creative writing role play group. A big part of participating in this group involves saving up game currency to be able to go on adventures. When they go on an adventure they submit some information about where they will be going and what they will do in this format:
 
**EXPLORING**   
- zone: forest of glime 
- Important Area: The Shadows 
- Character ID and Name: W69 Fellheim 
- Activity-specific Bonuses: 
  - Forn Gevir

<hr>  
Then this app then randomly generates an adventure outcome that includes success or failure, items gained, and injuries incurred. 

For example:

**ROLLED EXPLORING FOR w69 Fellheim**  
  - ACTIVITY SUCCESS (49)
  - Location: Forest Of Glime, The Shadows
  - Bonuses Applied: Forn Gevir
  - Number of Items: 2
  - Item Qualities: POOR, COMMON
  - Items Found:
    -https://www.deviantart.com/hvallaadmin/art/Absorbent-Moss-826531825
    -https://www.deviantart.com/hvallaadmin/art/Caribou-Hide-757135243
  - Injury: No Injury

### Technologies used:
- This a React application written in Typescript and deployed to AWS Amplify.
- Its not much to look at LOL, but it does what my wife's RP group wanted it to do. Here it is: https://main.d29pe94mw9evmw.amplifyapp.com/
- The React frontend accesses the adventure outcome logic api via a sym link in the node modules. The inventory of items, areas, and outcomes were written in yaml by my wife's RP group and they are converted to JSON using the js-yaml package for use in the application.
- The unit tests are written in Jest.

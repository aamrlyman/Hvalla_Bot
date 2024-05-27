import React from 'react';
import { useState } from 'react';
import {runActivity}  from 'discordBot';
import './App.css';

function App() {
  const [activityOutput, setActivityOutput] = useState("activityOutput" )
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const activityInput = event.target.activityInput.value;
    const output = runActivity(activityInput);
    setActivityOutput(output);
  }

  return (
    <div className="App">
       <h1>Hvalla Bot</h1>
    <form onSubmit={handleSubmit}>
      <label>Activity Input</label>
      <br />
      <textarea
        name="activityInput"
        id="activityInput"
        defaultValue={
       `hunting   
       zone: forest of glime 
       Important Area: The Shadows 
       Character ID and Name: W69 Fellheim 
       Activity-specific Bonuses: 
       - Forn Gavir
       - Grey Owl
prey: gryllo`}
      >
</textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div id="outputContainer">
      <p id="activityOutput">{activityOutput}</p>
    </div>
    </div>
  );
}

export default App;

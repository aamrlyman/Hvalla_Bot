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
    <form key="asdfdas" onSubmit={handleSubmit}>
      <label>Activity Input</label>
      <br />
      <textarea
        name="activityInput"
        id="activityInput"
        defaultValue={
       `EXPLORING   
       zone: forest of glime 
       Important Area: The Shadows 
       Character ID and Name: W69 Fellheim 
       Activity-specific Bonuses: 
       - Forn Gevir`}
      >
</textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div id="outputContainer">
      <div id="activityOutput">{activityOutput.split("\n").map((line, index)=>{
        return <div>
        <span key={index}>{line}</span><br />
          </div>
      })}</div>
    </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

const App = () => {
  const [bmi, setBmi] = useState();
  const [info, setInfo] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const handleBmi = () => {
    let val = (
      [Number(weight) / Number(height) / Number(height)] * 10000
    ).toFixed(1);
    setBmi(val);
    if (val < 18.5) {
      setInfo("Under Weight");
    } else if (val > 18.5 && val <= 24.9) {
      setInfo("Healthy");
    } else if (val > 24.9 && val < 30) {
      setInfo("Overweight");
    } else {
      setInfo("Obese");
    }
  };
  return (
    <div>
      <h1>BMI Calculator</h1>
      <input
        type="text"
        onChange={(e) => setHeight(e.target.value)}
        placeholder="height in cm"
      />
      <input
        type="text"
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight in kg"
      />
      <button onClick={handleBmi}>Calculate</button>
      <h1>{bmi}</h1>
      <h2>{info}</h2>
    </div>
  );
};

export default App;

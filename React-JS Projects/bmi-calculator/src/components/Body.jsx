import { useState } from "react";

function Body() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [res, setRes] = useState("");
  const [showPara, setPara] = useState(false);

  function handleChangeHt(event) {
    const newValue = event.target.value;
    setHeight(newValue);
  }

  function handleChangeWt(event) {
    const newValue = event.target.value;
    setWeight(newValue);
  }

  function handleClick(event) {
    const currHt = Number(height);
    const currWt = Number(weight);

    const BMI = (currWt / (currHt * currHt)).toString().slice(0, 5);

    setRes(BMI);
    setPara(true);
    event.preventDefault();
  }

  return (
    <div style={{ marginTop: "40px" }} className="row mid">
      <div className="box col-lg-5 col-md-9 col-xs-12">
        <div className="heading row">
          <div className="col">
            <h1>Calculate Your BMI</h1>
          </div>
        </div>
        <div className="form-inp row">
          <form>
            <div className="col height">
              <label id="ht">Enter Your Height(in m):</label>
              <input className="ht" type="text" onChange={handleChangeHt} value={height} required="true"></input>
            </div>
            <div className="col weight">
              <label id="wt">Enter Your Weight(in kg):</label>
              <input className="wt" type="text" onChange={handleChangeWt} value={weight} required="true"></input>
            </div>
            <div className="col res">
            <p>{showPara && "Your BMI is: " + res}</p>
            </div>
            <div className="col btnn">
              <button id="bt" type="submit" onClick={handleClick}>Calculate</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Body;

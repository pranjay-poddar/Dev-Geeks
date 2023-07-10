import React, { useState } from "react";

// Features and operations of textUtils is taken care of by the following code

export default function TextForms(props) {
  const handleUpClick = () => {
    console.log("Upper case was clicked " + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleLowClick = () => {
    console.log("Upper case was clicked " + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase", "success");
  };

  const handleReplace = () => {
    console.log("Text was Replaced" + text);
    let newText = text.replace("this", "that");
    setText(newText);
    //}
    props.showAlert("Text replaced successfully", "success");
  };

  const handleSlicing = () => {
    console.log("Text was Sliced" + text);
    let num1 = 4;
    let num2 = 9;
    let newText = text.slice(num1, num2);
    setText(newText);
    props.showAlert("Sliced everything except [4..9]", "success");
  };

  const handleClick = () => {
    console.log("Text was erased " + text);
    let newText = " ";
    setText(newText);
    props.showAlert("Text erased", "success");
  };

  const handleOnChange = (event) => {
    console.log("On Change");
    setText(event.target.value);
  };

  const [text, setText] = useState("");

  return (
    <>
      <div
        className="container "
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <div className="mb-3">
          <h1 className="mb-2">{props.heading}</h1>
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#345b93",
              color: props.mode === "light" ? "black" : "white",
            }}
            id="myBox"
            rows="8"
          ></textarea>
          <br />
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleUpClick}
          >
            Convert to uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleLowClick}
          >
            Convert to lowercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleClick}
          >
            Erase Text
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleReplace}
          >
            Replace text
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleSlicing}
          >
            Slice text[4...9]
          </button>
        </div>
      </div>
      <div
        className="conatiner my-3"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <hr></hr>
        <h2>Your text summary</h2>
        <p>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          minutes to read
        </p>
        <hr></hr>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}

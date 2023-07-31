import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled }) {
  // Destructuring values from the AppContext using useContext hook
  const { gameOver, onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);

  // Function to handle the click event on a keyboard key
  const selectLetter = () => {
    if (gameOver.gameOver) return; // If the game is over, do not handle the click event

    // Call the relevant function based on the clicked key
    if (keyVal === "ENTER") {
      onEnter(); // Call the onEnter function when Enter key is clicked
    } else if (keyVal === "DELETE") {
      onDelete(); // Call the onDelete function when Delete key is clicked
    } else {
      onSelectLetter(keyVal); // Call the onSelectLetter function with the clicked letter as an argument
    }
  };

  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"} // Conditionally add the "big" or "disabled" class based on the props
      onClick={selectLetter} // Attach the selectLetter function to handle the click event
    >
      {keyVal} {/* Display the key value inside the keyboard key */}
    </div>
  );
}

export default Key;

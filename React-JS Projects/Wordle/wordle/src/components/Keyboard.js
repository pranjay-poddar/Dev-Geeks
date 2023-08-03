import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  // Define arrays for each row of keys on the keyboard
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // Destructure values from the AppContext using useContext hook
  const {
    board,
    disabledLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  // Callback function to handle keyboard events (keypress)
  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return; // If the game is over, do not handle keyboard events
      if (event.key === "Enter") {
        onEnter(); // Call the onEnter function when Enter key is pressed
      } else if (event.key === "Backspace") {
        onDelete(); // Call the onDelete function when Backspace key is pressed
      } else {
        // Handle the regular key presses (letters) from each row of keys
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key); // Call the onSelectLetter function with the pressed letter as an argument
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key); // Call the onSelectLetter function with the pressed letter as an argument
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key); // Call the onSelectLetter function with the pressed letter as an argument
          }
        });
      }
    },
    [currAttempt] // This effect will trigger whenever the current attempt changes
  );

  // Add event listener for keydown events when the component mounts
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  console.log(disabledLetters); // Log the disabled letters to the console (for debugging purposes)

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      {/* Render the first row of keys */}
      <div className="line1">
        {keys1.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />; // Render Key component for each key with disabled state
        })}
      </div>
      {/* Render the second row of keys */}
      <div className="line2">
        {keys2.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />; // Render Key component for each key with disabled state
        })}
      </div>
      {/* Render the third row of keys */}
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey /> {/* Render a bigger Enter key */}
        {keys3.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />; // Render Key component for each key with disabled state
        })}
        <Key keyVal={"DELETE"} bigKey /> {/* Render a bigger Delete key */}
      </div>
    </div>
  );
}

export default Keyboard;

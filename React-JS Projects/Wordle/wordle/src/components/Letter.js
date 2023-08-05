import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  // Destructuring values from the AppContext using useContext hook
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);

  // Get the letter at the specified position on the game board
  const letter = board[attemptVal][letterPos];

  // Check if the current letter is correct, incorrect, or almost correct
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal
      ? correct
        ? "correct"
        : almost
        ? "almost"
        : "error"
      : "";

  // Use useEffect to handle the state updates and side-effects
  useEffect(() => {
    // If the letter is incorrect (not an empty string, not correct, and not almost correct),
    // add it to the list of disabled letters
    if (letter !== "" && !correct && !almost) {
      console.log(letter); // Log the incorrect letter to the console (for debugging purposes)
      setDisabledLetters((prev) => [...prev, letter]); // Update the list of disabled letters
    }
  }, [currAttempt.attempt]); // This effect will trigger whenever the current attempt changes

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;

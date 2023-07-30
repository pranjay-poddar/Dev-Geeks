import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  // Destructuring values from the AppContext using useContext hook
  const {
    board, // The game board
    setBoard, // Function to update the game board
    currAttempt, // Current attempt information
    gameOver, // Information about the game over state
    onSelectLetter, // Function to handle letter selection
    correctWord, // The correct word that was supposed to be guessed
    onDelete, // Function to delete a letter from the board
  } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>
        {/* Conditionally display success or failure message based on the gameOver state */}
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      {/* Display the number of attempts if the word was correctly guessed */}
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;

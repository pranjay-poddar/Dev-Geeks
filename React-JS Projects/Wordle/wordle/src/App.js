import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

// Create the AppContext to be used for state management across components
export const AppContext = createContext();

function App() {
  // State variables used throughout the App component
  const [board, setBoard] = useState(boardDefault); // The game board
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 }); // Current attempt information
  const [wordSet, setWordSet] = useState(new Set()); // Set of valid words for the game
  const [correctWord, setCorrectWord] = useState(""); // The correct word that needs to be guessed
  const [disabledLetters, setDisabledLetters] = useState([]); // List of disabled letters (incorrect and not valid)
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  }); // Game over state information

  // Fetch the word set and the correct word from an external data source using useEffect
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet); // Set the valid word set
      setCorrectWord(words.todaysWord); // Set the correct word for the game
    });
  }, []);

  // Handler for the Enter key press
  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    // Check if the entered word exists in the word set
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 }); // Move to the next attempt
    } else {
      alert("Word not found"); // Show an alert if the word is not valid
    }

    // Check if the word is correctly guessed
    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true }); // Set game over state as true (successfully guessed the word)
      return;
    }

    // Check if the player reached the maximum number of attempts (5) and game over
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false }); // Set game over state as true (failed to guess the word)
      return;
    }
  };

  // Handler for the Delete key press
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  // Handler for selecting a letter from the keyboard
  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      {/* Provide the AppContext to the child components */}
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board /> {/* Render the game board */}
          {/* Conditionally render either GameOver component or Keyboard component */}
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

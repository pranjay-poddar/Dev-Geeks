import React, { useState } from 'react'; // Import React library and useState hook

function Square({ value, onClick }) { // Function component for Square with value and onClick props
  return (
    <button className="square" onClick={onClick}> 
      {value} // Render value of Square component
    </button>
  );
}

function Board() { // Function component for Board
  const [squares, setSquares] = useState(Array(9).fill(null)); // Array of 9 squares with null values, and setter function for state

  const handleClick = (i) => { // Function to handle clicks on Squares
    const newSquares = [...squares]; // Clone squares array
    if (calculateWinner(newSquares) || newSquares[i]) { 
      // Check whether there's a winner or the clicked square already has a value
      return; // Return without making any changes
    }
    newSquares[i] = xIsNext ? 'X' : 'O'; // Change value of newSquares array to either 'X' or 'O', depending on whose turn it is
    setSquares(newSquares); // Update value of squares state array
    setXIsNext(!xIsNext); // Change value of xIsNext state variable to alternate between players
  };

  const renderSquare = (i) => { // Function to render individual Square components with onClick function
    return (
      <Square
        value={squares[i]} // Value of Square is the value of the corresponding element in squares array
        onClick={() => handleClick(i)} // onClick function to change the value of the corresponding element in squares array
      />
    );
  };

  const winner = calculateWinner(squares); // Calculate winner with calculateWinner function
  const xIsNext = winner === null && squares.filter(x => x === null).length % 2 === 0; // Determine whose turn it is with xIsNext variable

  let status;
  if (winner) {
    status = "Winner: " + winner; // If there is a winner, display a message with the winner
  } else if (squares.filter(x => x === null).length === 0) {
    status = "Draw"; // If all squares are filled and no winner, display a message for a draw
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); // Otherwise, display whose turn it is
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares) { // Function to calculate winner
  const lines = [
    [0, 1, 2], // Horizontal win lines
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical win lines
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal win lines
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Check if there is a match in squares array for each win line
      return squares[a]; // Return player who has won
    }
  }
  return null; // If no winner, return null
}

function App() { // Main App component
  const handleRestart = () => { // Function to handle button click to restart game
    window.location.reload(); // Reload page to reset game
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default App; // Export App component
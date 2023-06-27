import React from 'react';
import Board from './Board';
import Info from './Info';
import { useState } from 'react';
// CSS File
import './css/app.css';

function App() {

    // Creating a reset state, which indicates whether 
    // the game should be reset or not
    const [reset, setReset] = useState(false);

    // Creating a winner state, which indicates
    // the current winner
    const [winner, setWinner] = useState('');

    // Sets the reset property to true
    // which starts the chain 
    const resetBoard = () => {
        setReset(true);
    }

    return (
        <div className="App">
            <p className='heading'>Tic Tac Toe Game</p>
            {/* Shrinks the popup when there is no winner */}
            <div className={`winner ${winner !== '' ? '' : 'shrink'}`}>
                {/* Display the current winner */}
                <div className='winner-text'>{winner}</div>
                {/* Button used to reset the board */}
                <button onClick={() => { resetBoard() }}>
                    Reset Board
                </button>
            </div>

            {/* Custom made board component comprising of 
            the tic-tac-toe board  */}
            {/* Passing Props reset,setReset,winner,setWinner to Board component */}
            <Board reset={reset} setReset={setReset} winner={winner} setWinner={setWinner} />
            <Info />
            <button onClick={() => { resetBoard() }}>
                Reset Board
            </button>

        </div>
    );
}

export default App;
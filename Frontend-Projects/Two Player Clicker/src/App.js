import React, { useEffect, useRef } from 'react'
import './style.css'
const App = () => {

    const initialData = 0;
    let timeLimit = 5;
    let intervalID = useRef(null);

    const [p1count, setp1count] = React.useState(initialData);
    const [p2count, setp2count] = React.useState(initialData);
    const [timeCount, settimeCount] = React.useState(timeLimit);
    const [isStart, setIsStart] = React.useState(false);
    const [isGameOver, setIsGameOver] = React.useState(false);

    useEffect(() => {
        if (isGameOver) {
            if (p1count > p2count)
                alert("Player 1 Wins");
            else if (p1count < p2count)
                alert("Player 2 Wins");
            else if (p1count === p2count)
                alert("Tie! No one Wins");
            setp1count(initialData);
            setp2count(initialData);
            setIsGameOver(false)
        }
    }, [isGameOver, p1count, p2count])


    const player1click = () => {
        if (isStart)
            setp1count(prev => prev + 1);
    }

    const player2click = () => {
        if (isStart)
            setp2count(prev => prev + 1);
    }

    const timeCounter = () => {
        setIsStart(true)
        intervalID.current = setInterval(() => { settimeCount(prev => (prev > 0) ? prev - 1 : gameEnd()) }, 1000);
    }
    const reset = () => {
        setIsStart(false);
        settimeCount(timeLimit);
    }

    const gameEnd = () => {
        clearInterval(intervalID.current);
        setIsGameOver(true);
        reset();
    }
    const startGame = () => {
        timeCounter();
    }

    return (
        <>
            <div className="container">
                <p>{timeCount + " sec"}</p>
                <div className="center_div">
                    <div className="inc" onClick={player1click}>
                        <span className='content'>{"Player 1 -> " + p1count}</span>
                    </div>
                    <div className="dec" onClick={player2click}>
                        <span className='content'>{"Player 2 -> " + p2count}</span>
                    </div>
                </div>
                {!isStart ? <button className='startBtn' onClick={startGame}>Start</button> : null}
            </div>
        </>
    )
}

export default App

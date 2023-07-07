import React, { useState } from 'react'
import './ninetynine.css';

export default function Ninetynine() {
    const [sum, setSum] = useState(0);
    const [turn, setTurn] = useState(true);
    const [choice, setChoice] = useState(0);

    const choose = (num) => {
        if(!turn) return;
        if(sum == 99) {
            setSum(0);
            return;
        }
        setTurn(false);
        var total = sum + num;
        setSum(total);
        setChoice(num);
        setTimeout(() => {
            setChoice(11 - num);
            setSum(total + 11 - num);
            setTurn(true);
        } ,1200);
    }

  return (
    <div className='fancy'>
        <div>
            <h1 className='h'>Ninety - Nine</h1>
            {sum == 99 ? "You Lose !!!" : <p>Who makes the sum 99 wins!</p>}
        </div>
        <div>
            <h1 className='h'>{sum}</h1>
            {sum ? <p>{turn ? "I choose " : "You choose "} {choice}</p> : "Let's Start"}
            <p>{turn ? "Your Turn!": "Thinking ..."}</p>
            <div className='keypad'>
                <div>
                    <div onClick={() => choose(1)}>1</div>
                    <div onClick={() => choose(2)}>2</div>
                    <div onClick={() => choose(3)}>3</div>
                </div>
                <div>
                    <div onClick={() => choose(4)}>4</div>
                    <div onClick={() => choose(5)}>5</div>
                    <div onClick={() => choose(6)}>6</div>
                </div>
                <div>
                    <div onClick={() => choose(7)}>7</div>
                    <div onClick={() => choose(8)}>8</div>
                    <div onClick={() => choose(9)}>9</div>
                </div>
                <div><span></span><div onClick={() => choose(10)}>10</div></div>
            </div>
        </div>
    </div>
  )
}
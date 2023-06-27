// This file contains info about the tic-tac-toe game

import React from 'react';
import './css/info.css';

const Info = () => {
    return (
        <div className='info'>
            <div className='player'>Player 1 : &nbsp;X</div>
            <div className='player'>Player 2 : &nbsp;O</div>
        </div>
    )
}

export default Info;
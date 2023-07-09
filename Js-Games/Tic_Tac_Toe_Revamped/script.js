"use strict";

const Player = (sign) => {
    this.sign = sign;

    const getSign =()=>{
        return sign;
    }

    return { getSign };
}

const logicalGameBoard = (()=>{
    const board = ["", "", "", "","", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const getField = (index) => {
        return board[index];
    };

    const resetFields = () =>{
        for(let i=0; i<board.length; i++){
            board[i] = "";
        }
    };

    return { setField, getField, resetFields, board };
})();

const displayController = (()=>{
    const gameInitializerButton = document.querySelector('.game-initializer__action-btn'),
          gameConsole = document.querySelector('main'),
          resultDisplayer = document.querySelector('.result-conveyer'),
          nextRoundBtn = document.querySelector('.result-conveyer__continue-btn'),
          quitGameBtn = document.querySelector('.result-conveyer__reset-btn'),
          fieldElements = document.querySelectorAll('.game-board__field'),
          fieldElementsStates = document.querySelectorAll('.game-board__state'),
          restartBtn = document.querySelector('.main__restart-btn'),
          scoreDisplayerElements = document.querySelectorAll('.main__score-displayer');

    let playerXScore = 0, playerOScore = 0, tiedMatches = 0, tie = false;

    gameInitializerButton.addEventListener('click', (e)=>{
        activateBtn(e.target)

        setTimeout(()=>{
            setActiveStates()
            e.target.parentElement.classList.add('disabled');
            gameConsole.classList.remove('disabled');
        }, 500);
    })

    const activateBtn = (element) =>{
        function removeTransition(e){
            if(e.propertyName !== 'transform') return;
            e.target.classList.remove('clicked');     
        }
        element.classList.add('clicked');
        element.addEventListener('transitionend', removeTransition);
    }


    fieldElementsStates.forEach((field)=>
        field.addEventListener('click', (e)=>{
            let fieldState = e.target.dataset.fieldState;
            if (gameController.getIsOver() || (fieldState == 'set-x' || fieldState == 'set-o')) return;
            gameController.playRound(parseInt(e.target.parentElement.dataset.index));
            updateGameboard();
            activateBtn(e.target.parentElement)
        })
    );

    restartBtn.addEventListener('click', (e)=>{
        restartGame()
        activateBtn(e.target)
    })

    nextRoundBtn.addEventListener('click', (e)=>{
        activateBtn(e.target)
        setTimeout(()=>{
            e.target.parentElement.parentElement.classList.add('disabled')
            tie=false;
            restartGame()
        }, 500)
    })

    quitGameBtn.addEventListener('click', (e)=>{
        activateBtn(e.target)
        playerXScore = 0;
        playerOScore = 0;
        tiedMatches = 0;
        tie = false;
        resultDisplayer.classList.remove('disabled');

        updateScoreBoard('reset')
        setTimeout(()=>{
            restartGame();
            e.target.parentElement.parentElement.classList.add('disabled');
            gameConsole.classList.add('disabled');
            gameInitializerButton.parentElement.classList.remove('disabled');
        }, 500)
    })

    const updateGameboard = () => {
        for(let i=0; i<fieldElementsStates.length;i++){
            fieldElementsStates[i].dataset.fieldState = `set-${logicalGameBoard.getField(i)}`
            setActiveStates()
        }
    };

    const updateScoreBoard = (scoreEntity) => {
        if(scoreEntity === 'x'){scoreDisplayerElements[0].textContent = ++playerXScore}
        else if(scoreEntity === 'o'){scoreDisplayerElements[2].textContent = ++playerOScore; }
        else if(scoreEntity === 'reset'){scoreDisplayerElements.forEach((el)=>el.textContent=0)}
        else { scoreDisplayerElements[1].textContent = ++tiedMatches; tie=true }

        if(scoreEntity === 'reset') return;

        setTimeout(()=>{
            resultDisplayer.classList.remove('disabled')
            displayResultConveyer();
        }, 1000);
    }

    const setActiveStates = () => {
        document.querySelectorAll('[data-field-turn]').forEach((el)=>el.dataset.fieldTurn = `turn-${gameController.getCurrentPlayerSign()}`)

        if(tie === true){
            document.querySelectorAll('[data-field-turn]')[10].dataset.fieldTurn='';
            document.querySelectorAll('[data-field-turn]')[10].children[1].textContent = 'It\'s a Tie!';
            resultDisplayer.querySelector('p').classList.add('disabled')
            resultDisplayer.querySelector('section:nth-child(2)').classList.add('greyish-text')
        }
        else {
            document.querySelectorAll('[data-field-turn]')[10].children[1].textContent = 'Takes the round'
            resultDisplayer.querySelector('p').classList.remove('disabled')
            resultDisplayer.querySelector('section:nth-child(2)').classList.remove('greyish-text')
        }
    }

    const setBoardBackgroundColor = (boardElements) => {
        let signArray = [];
        boardElements.forEach((el)=>signArray.push(logicalGameBoard.getField(el)))
        if(signArray.includes('x') === true){
            boardElements.forEach((el)=>fieldElements[el].classList.add('game-board--field-won-x'))
            updateScoreBoard('x')
        }else {
            boardElements.forEach((el)=>fieldElements[el].classList.add('game-board--field-won-o')) 
            updateScoreBoard('o')
        }
    }

    const restartGame = () => {
        logicalGameBoard.resetFields();
        gameController.resetGame();
        removeBoardBackgroundColor(fieldElements)
        updateGameboard();
    }

    const removeBoardBackgroundColor = (boardElements) => {
        boardElements.forEach((el)=>el.className = 'game-board__field')
    }

    return { setBoardBackgroundColor, updateScoreBoard };
})();

const gameController = (()=>{
    const playerX = Player("x");
    const playerO = Player("o");
    let round = 1,
        isOver = false,
        result = false;

    const playRound = (fieldIndex) => {
        logicalGameBoard.setField(fieldIndex, getCurrentPlayerSign());
        checkWinner(fieldIndex)
    
        if(result){
            isOver = true;
            return;
        }
        if (round === 9){
            displayController.updateScoreBoard('tie');
            isOver = true;
            return;
        }
        round++;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const checkWinner = (fieldIndex) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ];
        const winnerTrigger=(provenPossibility)=>{
            let element;
            if(provenPossibility.every((element=index)=>logicalGameBoard.getField(element)===getCurrentPlayerSign())){
                result = true;
                displayController.setBoardBackgroundColor(provenPossibility);
            }
        }
        let possibleCombinations;
        return winningCombinations
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombinations = possibilities)=>
            possibleCombinations.every((index)=>{logicalGameBoard.getField(index)===getCurrentPlayerSign()?winnerTrigger(possibleCombinations):false})
        );
    };

    const resetGame = () =>{
        isOver = false;
        result = false;
        round = 1;
    };

    const getIsOver = () => {
        return isOver;
    }

    return { playRound, resetGame, getIsOver, getCurrentPlayerSign }
})();
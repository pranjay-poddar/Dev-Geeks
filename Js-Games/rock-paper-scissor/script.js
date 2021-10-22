const gameInputs = ['rock', 'paper', 'scissors'];
let computerSel;
let round1Answer;
let userSelection;
let score = 0;

function game() {

    function humanPlay() {

        document.getElementById("btn1").addEventListener("click", () => {
            userSelection = "rock";
            // console.log(`User Selection: ${userSelection}`)
        })
        document.getElementById("btn2").addEventListener("click", () => {
            userSelection = "paper";
            // console.log(`User Selection: ${userSelection}`)
        })
        document.getElementById("btn3").addEventListener("click", () => {
            userSelection = "scissor";
            // console.log(`User Selection: ${userSelection}`)
        })
    }

    function computerPlay() {

        computerSel = Math.floor(Math.random() * 3);
        round1Answer = (gameInputs[computerSel]);
        // console.log(`Round ans is ${round1Answer}`)

    }

    function playRound(round1Answer, userSelection) {

        if (userSelection == 'rock' && round1Answer == 'scissors') {
            score += 1;
            // console.log(score)
            alert('You WIN!, Your Score Is: ' + score);
        }
        else if (userSelection == 'paper' && round1Answer == 'rock') {
            score += 1;
            // console.log(score)
            alert('You WIN!, Your Score Is: ' + score);
        }
        else if (userSelection == 'scissors' && round1Answer == 'paper') {
            // score += 1;
            console.log(score)
            alert('You WIN, Your Score Is: ' + score);
        }
        else if (round1Answer== 'rock' && userSelection == 'rock') {
            alert('It/s a tie!, Your Score Is: ' + score);
        }
        else if (round1Answer == 'paper' && userSelection == 'paper') {
            alert('It/s a tie!, Your Score Is: ' + score);
        }
        else if (round1Answer == 'scissors' && userSelection == 'scissors') {
            alert('It/s a tie!, Your Score Is: ' + score);
        }
        else {
            // score -= 1;
            // console.log(score)
            alert('You LOSE!, Your Score Is: ' + score);
        }
    }
    function checkScore(){
        if(score == 5){
            alert("Game Has Ended Press Ok To Restart")
            score = 0;
        }
    }
    checkScore();
    humanPlay();
    computerPlay();
    playRound(round1Answer, userSelection);
}
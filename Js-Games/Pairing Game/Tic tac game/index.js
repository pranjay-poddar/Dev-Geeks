const allbox = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".gameinformation");
const Newgame = document.querySelector(".Newgame");

let currentPlayer;
let Grid;

const winnninPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function intializeGame() {
    currentPlayer = "X";
    Grid = ["", "", "", "", "", "", "", "", ""];


    allbox.forEach((box, index) => {
        box.innerText = "";
        allbox[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })

    Newgame.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;

}


function swapturn() {
    if (currentPlayer == "X") {
        currentPlayer = "0"
    } else {
        currentPlayer = "X";
    }

    gameinfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver() {
    let answer = "";
    winnninPosition.forEach((position) => {
        if ((Grid[position[0]] !== "" || Grid[position[1]] !== "" || Grid[position[2]] !== "") &&
            (Grid[position[0]] === Grid[position[1]]) && (Grid[position[1]] === Grid[position[2]])) {

            //check if winner is X
            if (Grid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }

            //disable pointer events
            allbox.forEach((box) => {
                box.style.pointerEvents = "none";

            })

            allbox[position[0]].classList.add("winner");
            allbox[position[1]].classList.add("winner");
            allbox[position[2]].classList.add("winner");
        }
    });
    //it means we have a winner
    if (answer !== "") {
        gameinfo.innerText = `Winner Player - ${answer}`;
        Newgame.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    Grid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    //board is Filled, game is TIE
    if (fillCount === 9) {
        gameinfo.innerText = "Game Tied !";
        Newgame.classList.add("active");
    }

}


function handleClick(index) {
    if (Grid[index] == "") {
        allbox[index].innerText = currentPlayer;
        Grid[index] = currentPlayer;

        swapturn();

        checkGameOver();
        allbox[index].style.pointerEvents = "none";

    }
}


intializeGame();

allbox.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

Newgame.addEventListener("click", intializeGame);
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let messageRef = document.getElementById("message");
let gameBoard = document.getElementById("game-board");
let optionButtons = document.querySelectorAll(".option-btn");

let xTurn = true;
let count = 0;
let gameActive = false;
let isAgainstAI = false;

const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
};

const showPopup = (text) => {
  messageRef.innerHTML = text;
  popupRef.classList.remove("hide");
};

const hidePopup = () => {
  popupRef.classList.add("hide");
};

const checkWin = (player) => {
  for (let pattern of winningPattern) {
    if (
      btnRef[pattern[0]].innerText === player &&
      btnRef[pattern[1]].innerText === player &&
      btnRef[pattern[2]].innerText === player
    ) {
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  return Array.from(btnRef).every((button) => button.innerText !== "");
};

const makeAIMove = () => {
    // Check if AI can win in the next move
    for (let pattern of winningPattern) {
      const [a, b, c] = pattern;
      if (
        btnRef[a].innerText === "O" &&
        btnRef[b].innerText === "O" &&
        btnRef[c].innerText === ""
      ) {
        btnRef[c].innerText = "O";
        return;
      }
      if (
        btnRef[a].innerText === "O" &&
        btnRef[c].innerText === "O" &&
        btnRef[b].innerText === ""
      ) {
        btnRef[b].innerText = "O";
        return;
      }
      if (
        btnRef[b].innerText === "O" &&
        btnRef[c].innerText === "O" &&
        btnRef[a].innerText === ""
      ) {
        btnRef[a].innerText = "O";
        return;
      }
    }
  
    // Check if the player can win in the next move and block them
    for (let pattern of winningPattern) {
      const [a, b, c] = pattern;
      if (
        btnRef[a].innerText === "X" &&
        btnRef[b].innerText === "X" &&
        btnRef[c].innerText === ""
      ) {
        btnRef[c].innerText = "O";
        return;
      }
      if (
        btnRef[a].innerText === "X" &&
        btnRef[c].innerText === "X" &&
        btnRef[b].innerText === ""
      ) {
        btnRef[b].innerText = "O";
        return;
      }
      if (
        btnRef[b].innerText === "X" &&
        btnRef[c].innerText === "X" &&
        btnRef[a].innerText === ""
      ) {
        btnRef[a].innerText = "O";
        return;
      }
    }
  
    // If no winning or blocking move is available, make a random move
    const emptyIndexes = [];
    btnRef.forEach((button, index) => {
      if (button.innerText === "") {
        emptyIndexes.push(index);
      }
    });
  
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    btnRef[randomIndex].innerText = "O";
  };
  

  const handleClick = (event) => {
    const button = event.target;
    if (button.innerText === "" && gameActive) {
      if (!isAgainstAI && ((xTurn && button.innerText !== "O") || (!xTurn && button.innerText !== "X"))) {
        button.innerText = xTurn ? "X" : "O";
        count++;
  
        if (checkWin(button.innerText)) {
          disableButtons();
          showPopup(`Player ${button.innerText} wins!`);
        } else if (checkDraw()) {
          disableButtons();
          showPopup("It's a draw!");
        } else {
          xTurn = !xTurn;
        }
      } else if (isAgainstAI) {
        button.innerText = "X";
        count++;
  
        if (checkWin(button.innerText)) {
          disableButtons();
          showPopup(`Player ${button.innerText} wins!`);
        } else if (checkDraw()) {
          disableButtons();
          showPopup("It's a draw!");
        } else {
          makeAIMove();
          count++;
  
          if (checkWin("O")) {
            disableButtons();
            showPopup("AI wins!");
          } else if (checkDraw()) {
            disableButtons();
            showPopup("It's a draw!");
          }
        }
      }
    }
  };
  
    
  
  
  
  
  
const startGameAI = () => {
  isAgainstAI = true;
  gameActive = true;
  hidePopup();
  enableButtons();
};

const startGameUser = () => {
  isAgainstAI = false;
  gameActive = true;
  hidePopup();
  enableButtons();
};

const handleRestart = () => {
  count = 0;
  xTurn = true;
  enableButtons();
  hidePopup();
  btnRef.forEach((button) => (button.innerText = ""));
  gameActive = true;
};

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".options").classList.add("hide");
    gameBoard.classList.remove("hide");
    if (button.id === "btn-ai") {
      startGameAI();
    } else if (button.id === "btn-user") {
      startGameUser();
    }
  });
});

btnRef.forEach((button) => button.addEventListener("click", handleClick));
newGameBtn.addEventListener("click", handleRestart);
restartBtn.addEventListener("click", handleRestart);

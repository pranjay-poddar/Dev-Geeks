"use strict";
var players = [];
var boardObj = [];
function generateBoard() {
  let row = 10,
    col = 10,
    boxNo = 100,
    board = document.getElementById("boardContainer"),
    snakes = [16, 6, 53, 33, 63, 59, 86, 23, 92, 72, 94, 74, 98, 77],
    ladders = [3, 13, 8, 30, 19, 37, 27, 87, 39, 58, 50, 66, 62, 80, 70, 90],
    snakeObj = [],
    ladderObj = [];
  board.innerHTML = "";

  for (let y = 0; y < snakes.length; y++) {
    snakeObj.push({
      head: snakes[y],
      tail: snakes[++y],
    });
  }

  for (let z = 0; z < ladders.length; z++) {
    ladderObj.push({
      head: ladders[z],
      tail: ladders[++z],
    });
  }

  for (let x = 0; x < row * col; x++) {
    boardObj.push({
      number: x,
      snakeHead: false,
      snakeTail: 0,
      ladderHead: false,
      ladderTail: 0,
    });
    let snakeIdx = snakeObj.map((x) => x.head).indexOf(x);
    let ladderIdx = ladderObj.map((x) => x.head).indexOf(x);

    if (snakeIdx > -1) {
      boardObj[x].snakeHead = true;
      boardObj[x].snakeTail = snakeObj[snakeIdx].tail;
    }
    if (ladderIdx > -1) {
      boardObj[x].ladderHead = true;
      boardObj[x].ladderTail = ladderObj[ladderIdx].tail;
    }
  }

  /* Render the board */
  for (var i = 0; i < row; i++) {
    if (i % 2 !== 0) {
      for (var j = 9; j >= 0; j--) {
        if (boardObj[boxNo - j - 1].snakeHead) {
          board.innerHTML += `<div class='box snake' id=box${boxNo - j} > ${
            boxNo - j
          } <p class='little-text'>Snake: Go to ${
            boardObj[boxNo - j - 1].snakeTail
          } </p></div>`;
        } else if (boardObj[boxNo - j - 1].ladderHead) {
          board.innerHTML += `<div class='box ladder' id=box${boxNo - j} > ${
            boxNo - j
          } <p class='little-text'>Ladder: Go to  ${
            boardObj[boxNo - j - 1].ladderTail
          } </p></div>`;
        } else {
          board.innerHTML += `<div class='box' id=box${boxNo - j} > ${
            boxNo - j
          } </div>`;
        }
      }
    } else {
      for (var k = 0; k < col; k++) {
        if (boardObj[boxNo - k - 1].snakeHead) {
          board.innerHTML += `<div class='box snake' id=box${boxNo - k} > ${
            boxNo - k
          } <p class='little-text'>Snake: Go to  ${
            boardObj[boxNo - k - 1].snakeTail
          } </p></div>`;
        } else if (boardObj[boxNo - k - 1].ladderHead) {
          board.innerHTML += `<div class='box ladder' id=box${boxNo - k} > ${
            boxNo - k
          } <p class='little-text'>Ladder: Go to  ${
            boardObj[boxNo - k - 1].ladderTail
          } </p></div>`;
        } else {
          board.innerHTML += `<div class='box' id=box${boxNo - k} > ${
            boxNo - k
          } </div>`;
        }
      }
    }
    boxNo -= 10;
    board.innerHTML += "<br/>";
  }
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function displayPlayer(playerNo, boxNo) {
  let boxId = "box" + boxNo;
  if (playerNo === 0) {
    let ele = document.querySelector(".one.on-board");
    if (ele) {
      ele.parentNode.removeChild(ele);
    }
    document.getElementById(
      boxId
    ).innerHTML += `<div class='player one on-board'></div>`;
  } else {
    let ele = document.querySelector(".two.on-board");
    if (ele) {
      ele.parentNode.removeChild(ele);
    }
    document.getElementById(
      boxId
    ).innerHTML += `<div class='player two on-board'></div>`;
  }
}

function postionCheck(playerNo) {
  let playerPosition = players[playerNo].position;
  if (playerPosition >= 100) {
    alert("Player" + (playerNo + 1) + " win");
    location.reload();
  }
  if (boardObj[playerPosition - 1].snakeHead) {
    players[playerNo].position = boardObj[playerPosition - 1].snakeTail;
  }
  if (boardObj[playerPosition - 1].ladderHead) {
    players[playerNo].position = boardObj[playerPosition - 1].ladderTail;
  }
  displayPlayer(playerNo, players[playerNo].position);
}

function toggleTurn(playerNo) {
  if (!playerNo) {
    document.getElementById("play0").setAttribute("disabled", "disabled");
    document.getElementById("play1").removeAttribute("disabled");
    document.querySelector(".player1").innerHTML = "";
  } else {
    document.getElementById("play1").setAttribute("disabled", "disabled");
    document.getElementById("play0").removeAttribute("disabled");
    document.querySelector(".player0").innerHTML = "";
  }
}

function move(playerNo) {
  let dice;
  toggleTurn(playerNo);
  dice = rollDice();
  document.querySelector(".player" + playerNo).innerHTML = dice;
  players[playerNo].position += dice;
  postionCheck(playerNo);
  localStorage.setItem("playerPositions", JSON.stringify(players));
}

function reset() {
  localStorage.removeItem("playerPositions");
  location.reload();
}

function startState() {
  players = [{ position: 0 }, { position: 0 }];
  if (players[0].position && players[1].position) {
    displayPlayer(0, players[0].position);
    displayPlayer(1, players[1].position);
  }
}

generateBoard();
startState();

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- But wait.. There is a twist in the game, if any of the player rolls two 6 in a row, that player will lose his entire global score and all his score will 
  be 0, also a 1 last and amazing twist is -- suppose any of the player is far away from the other player(winning), and the other player rolls 6 , and if 
  he holds and passes the dice to the player who is winning , then keep in mind that the other player already rolled a 6 and passed it, now...if the player
  who is winning rolls a 6 on his 1st attempt, that player will lose his entire global score..and the turn will be passed as well.... interesting.. right. 
  ENJOY THE GAME
  created by- Faizan Ahmed Siddiqui


*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. RANDOM NUMBER
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. Update the round score IF the rolled number was not a 1

    if (dice == 6 && lastDice == 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //ADD SCORE
      roundScore = roundScore + dice;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else {
      //NEXT PLAYER
      nextPlayer();
    }

    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // ADD CURRENT SCORE TO GLOBAL SCORE

    scores[activePlayer] = scores[activePlayer] + roundScore;

    //UPDATE THE UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //CHECK IF PLAYER WON THE GAME
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      //NEXT PLAYER
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //NEXT PLAYER
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector('.dice').style.display = 'none';
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

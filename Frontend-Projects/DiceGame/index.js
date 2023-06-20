//When first dice clicked
var first,second;
// var playerOne = Math.floor((Math.random() * 6) + 1);
// var playerTwo = Math.floor((Math.random() * 6) + 1);

document.querySelector(".img1").addEventListener("click", function(){
  first = Math.floor((Math.random() * 6) + 1);
  document.querySelector(".img1").setAttribute("src", "images/dice" + first + ".png");
  setTimeout(function(){
    document.querySelector("h1").innerHTML="Roll Second Dice";
  }, 100);
})

//When second dice clicked
document.querySelector(".img2").addEventListener("click", function(){
  second = Math.floor((Math.random() * 6) + 1);
  document.querySelector(".img2").setAttribute("src", "images/dice" + second + ".png");
  setTimeout(checkWinner(first,second),500)
  setTimeout(function(){
    document.querySelector("h1").innerHTML="Roll First Dice";
  }, 1000);
})

function checkWinner(playerOne,playerTwo){
  if (playerOne > playerTwo) {
    document.querySelector("h1").innerHTML = "Player 1 Won!";
  } else if (playerTwo > playerOne) {
    document.querySelector("h1").innerHTML = "Player 2 Won!";
  } else {
    document.querySelector("h1").innerHTML = "It's a Tie!";
  }
}

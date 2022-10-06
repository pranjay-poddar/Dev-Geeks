"use strict";

// PROJECT-#1 : Guess My Number

// Way to select element in JavaScript

/*
console.log(document.querySelector(".message").textContent);
// Selecting a element in JavaScript is exactly same as CSS, Look how we selected message here, even if it was a id we select it by writing #message.

// DOM =>>
// DOM stands for Document Object Model : Structured representation of HTML documents. allow JavaScript to access HTML elements and Styles in order to manipulate them.

// document.querySelector <= used to select the element.

document.querySelector(".message").textContent = "check number..";
document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 20;

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

// addEventListener() Method
// The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
// In simple language we can say that event is something that happens on the page, like: Mouse click, movuse moving and many more, then with the help of event listener we can wait for a certain event to happen and then react to it.

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  // When there is not input.
  if (!guess) {
    // document.querySelector(".message").textContent = "⛔ No number";
    displayMessage("⛔ No number");

    // When player wins.
  } else if (guess === secretNumber) {
    // document.querySelector(".message").textContent = "🎉 Correct number";
    displayMessage("🎉 Correct number");
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  // When guess is wrong.
  else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guess > secretNumber ? "📈 Too high" : "📈 Too low";
      displayMessage(guess > secretNumber ? "📈 Too high" : "📈 Too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "💥 you lost the game";
      displayMessage("💥 you lost the game");
      document.querySelector(".score").textContent = 0;
    }
  }
});
// When guess is too high.
/* 
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📈 Too high";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 you lost the game";
      document.querySelector(".score").textContent = 0;
    }

    // When guess is too low.
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📈 Too low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 you lost the game";
      document.querySelector(".score").textContent = 0;
    }
  }
});
*/

// In addEventListener('click') => First we have to pass the event as an argument, and here 'click' is the first argument.
// Here, we'll never call the function anywhere in the ceode. we only define the functi0n and pass it into the event handler
// But it the javaScript engine who calls the function as soon as the event happens.

// Resetting the game.

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

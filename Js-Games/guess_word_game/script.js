const inputs = document.querySelector(".inputs"),
  ResetBtn = document.querySelector(".reset-btn"),
  hint = document.querySelector(".hint span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  guessLeft = document.querySelector(".guess-left span"),
  typingInput = document.querySelector(".typing-input");

let word, maxGuess, corrects = [], incorrects = [];
function randomword() {
  //getting random object of word list
  let randomobj = word_list[Math.floor(Math.random() * word_list.length)];

  //getting word of random obj
  word = randomobj.word;
  maxGuess = 8, corrects = [], incorrects = [];
  hint.innerText = randomobj.hint;
  guessLeft.innerText = maxGuess;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`
  }
  inputs.innerHTML = html;
  wrongLetter.innerHTML = incorrects;
  guessLeft.innerHTML = maxGuess;
}
randomword();

function initgame(e) {
  let key = e.target.value;
  if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    }
    else {
      incorrects.push(` ${key}`);
      maxGuess--;
    }
    wrongLetter.innerHTML = incorrects;
    guessLeft.innerHTML = maxGuess;
  }
  typingInput.value = "";
  setTimeout(() => {
    if (corrects.length === word.length) {
      alert(`you found the word, congrats!! ${word.toUpperCase()}`);
      randomword();
    }
    else if (maxGuess < 1) {
      alert("you don't have more guesses, Game Over!");
      for (let i = 0; i < word.length; i++) {
        //show all letter 
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });

}

ResetBtn.addEventListener("click", randomword);
typingInput.addEventListener("input", initgame);
document.addEventListener("keydown", () => typingInput.focus());
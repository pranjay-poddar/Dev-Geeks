var wordList = [
  "apple",
  "banana",
  "orange",
  "strawberry",
  "grape",
  "watermelon",
  "pineapple",
  "jocker", 
  "helicoptor", 
  "iceberg", 
  "homogeneous",
  "believe", 
  "hamlet", 
  "waterfalls", 
  "javascript", 
  "testimonial", 
  "tournament", 
  "piano", 
  "aeroplane", 
  "mountain", 
  "olympics", 
  "skyscraper",
  "mantle", 
  "kangaroo", 
  "elephant", 
  "lieutenant", 
  "umbrella", 
  "honeybee",
  "seashore",
  "banglow",
  "machine", 
  "programming", 
  "Flashlight", 
  "game"
];
var randomIndex = Math.floor(Math.random() * wordList.length);
var word = wordList[randomIndex].toLowerCase();
var guessedLetters = [];
var resultElement = document.getElementById("result");
var chances = 6;
var correctSound = document.getElementById("correctSound");
var incorrectSound = document.getElementById("incorrectSound");

function displayWord() {
  var wordDisplay = document.getElementById("wordDisplay");
  var displayText = "";

  for (var i = 0; i < word.length; i++) {
    if (guessedLetters.includes(word[i])) {
      displayText += word[i];
    } else {
      displayText += "_";
    }
    displayText += " ";
  }

  wordDisplay.textContent = displayText;
}

function checkLetter(letter) {
  if (guessedLetters.includes(letter)) {
    resultElement.textContent = "You already guessed that letter. Try again.";
    return;
  }

  guessedLetters.push(letter);

  var buttonElement = document.getElementById(letter);
  buttonElement.disabled = true;

  if (word.includes(letter)) {
    resultElement.textContent = "Correct guess!";
    playSound(correctSound);
  } 
  else {
    chances--;
    resultElement.textContent = "Wrong guess!";
    document.getElementById("chances").textContent = "Chances: " + chances;
    playSound(incorrectSound);
  }

  displayWord();
  if(chances===0){
    resultElement.textContent = "OOPS! Great try. But you lost. The word is '" + word.toUpperCase() + "'. Try again";
    disableAllButtons();
  }
  if (!document.getElementById("wordDisplay").textContent.includes("_")) {
    resultElement.textContent = "Congratulations! You guessed the word '" + word.toUpperCase() + "'.";
    disableAllButtons();
  }
}

function disableAllButtons() {
  var keyboardButtons = document.querySelectorAll("#keyboard button");
  keyboardButtons.forEach(function (button) {
    button.disabled = true;
  });
}

function playSound(audioElement) {
  audioElement.pause();
  audioElement.currentTime = 0;
  audioElement.play();
}

function createKeyboard() {
  var keyboard = document.getElementById("keyboard");
  var alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < alphabet.length; i++) {
    var letter = alphabet[i];

    var button = document.createElement("button");
    button.textContent = letter;
    button.id = letter;
    button.addEventListener("click", function () {
      checkLetter(this.id);
    });

    keyboard.appendChild(button);
  }
}

displayWord();
createKeyboard();

const wordsDisplay = document.getElementById('words');
const userInput = document.getElementById('userInput');
const startButton = document.getElementById('startButton');
const checkButton = document.getElementById('checkButton');
const scoreDisplay = document.getElementById('score');

const wordList = [
  'happy', 'garden', 'computer', 'pencil', 'sunny', 'butterfly', 'mountain',
  'whisper', 'ocean', 'laughter', 'victory', 'courage', 'adventure', 'freedom',
  'chocolate', 'breeze', 'treasure', 'harmony', 'journey', 'moonlight', 'velvet'
];

let wordsToShow = [];
let score = 0;

function generateRandomWords() {
  const randomWords = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    randomWords.push(wordList[randomIndex]);
  }
  return randomWords;
}

function displayWords() {
  wordsToShow = generateRandomWords();
  wordsDisplay.textContent = wordsToShow.join(', ');
}

function startGame() {
  startButton.disabled = true;
  score = 0;
  scoreDisplay.textContent = score;
  displayWords();
  setTimeout(() => {
    wordsDisplay.textContent = '';
    userInput.value = '';
    userInput.disabled = false;
    checkButton.disabled = false;
    userInput.focus();
  }, 4000); // Show words for 4 seconds
}

function checkWords() {
  const userWords = userInput.value.split(',').map(word => word.trim());
  const correctWords = wordsToShow;

  let correctCount = 0;
  for (let i = 0; i < userWords.length; i++) {
    if (correctWords.includes(userWords[i])) {
      correctCount++;
    }
  }

  score += correctCount;
  scoreDisplay.textContent = score;

  displayWords();
  userInput.value = '';
  userInput.focus();
}

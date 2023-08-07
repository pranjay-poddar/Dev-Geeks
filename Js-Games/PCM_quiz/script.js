const questions = [
  // Physics questions
  {
    question: "What is the SI unit of force?",
    options: ["Newtons", "Meters", "Watts", "Amps"],
    answer: "Newtons",
    subject: "physics"
  },
  {
    question: "Which scientist is known for the laws of motion?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    answer: "Isaac Newton",
    subject: "physics"
  },
  {
    question: "What is the acceleration due to gravity on Earth?",
    options: ["9.8 m/s²", "5.6 m/s²", "12.3 m/s²", "6.5 m/s²"],
    answer: "9.8 m/s²",
    subject: "physics"
  },

  // Chemistry questions
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "N2"],
    answer: "H2O",
    subject: "chemistry"
  },
  {
    question: "Which gas is known as the 'Laughing Gas'?",
    options: ["Carbon Dioxide", "Nitrous Oxide", "Oxygen", "Hydrogen"],
    answer: "Nitrous Oxide",
    subject: "chemistry"
  },
  {
    question: "What is the atomic number of Carbon?",
    options: ["6", "12", "8", "14"],
    answer: "6",
    subject: "chemistry"
  },

  // Math questions
  {
    question: "What is the value of π (Pi) to two decimal places?",
    options: ["3.14", "3.16", "3.12", "3.18"],
    answer: "3.14",
    subject: "math"
  },
  {
    question: "What is the square root of 144?",
    options: ["12", "11", "14", "10"],
    answer: "12",
    subject: "math"
  },
  {
    question: "What is the result of (2 + 3) * 5?",
    options: ["15", "25", "10", "20"],
    answer: "25",
    subject: "math"
  },
  // Add more questions here...
];
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const subjectButtons = document.querySelectorAll(".subject-btn");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let selectedSubject = "all";
let timer;

function displayQuestion() {
  const filteredQuestions = questions.filter(question => question.subject === selectedSubject || selectedSubject === "all");
  if (currentQuestionIndex < filteredQuestions.length) {
    const question = filteredQuestions[currentQuestionIndex];
    const optionsHtml = question.options.map((option, optionIndex) => {
      return `<label>
                <input type="radio" name="question-${currentQuestionIndex}" value="${option}">
                ${option}
              </label>`;
    }).join("");

    quizContainer.innerHTML = `
      <div class="question">
        <p>${currentQuestionIndex + 1}. ${question.question}</p>
        <div class="options">${optionsHtml}</div>
      </div>
    `;
    startTimer(20);
  } else {
    showResult();
  }
}

function showResult() {
  const filteredQuestions = questions.filter(question => question.subject === selectedSubject || selectedSubject === "all");
  const percentageScore = ((score / filteredQuestions.length) * 100).toFixed(2);
  const resultText = `Your Score: ${score}/${filteredQuestions.length} (${percentageScore}%)`;
  quizContainer.innerHTML = "";
  resultContainer.textContent = resultText;
}

function checkAnswer() {
  const filteredQuestions = questions.filter(question => question.subject === selectedSubject || selectedSubject === "all");
  const selectedOption = document.querySelector(`input[name="question-${currentQuestionIndex}"]:checked`);

  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = filteredQuestions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
      score++;
    }

    currentQuestionIndex++;
    displayQuestion();
  }
}

function selectSubject(event) {
  selectedSubject = event.target.dataset.subject;
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
}

function startTimer(seconds) {
  clearInterval(timer);
  let timeRemaining = seconds;
  timer = setInterval(() => {
    if (timeRemaining >= 0) {
      timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
      timeRemaining--;
    } else {
      clearInterval(timer);
      // Move to the next question when time is up
      currentQuestionIndex++;
      displayQuestion();
    }
  }, 1000);
}

subjectButtons.forEach(button => {
  button.addEventListener("click", selectSubject);
});

submitButton.addEventListener("click", checkAnswer);
displayQuestion();

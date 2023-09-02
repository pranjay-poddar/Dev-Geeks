const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Marking Language",
        b: "Hyper Task Markup Language",
        c: "Hyper Text Markup Language",
        d: "None of the above",
        correct: "c",
    },
    {
        question: "Which choice is not part of CSS box model?",
        a: "Margin",
        b: "Border",
        c: "Paragraph",
        d: "Padding",
        correct: "c",
    },
    {
        question: "What is the <label> element used for?",
        a: "to identify the difference parts of a figure",
        b: "to explain what needs to be entered into a form field",
        c: "as a caption for images",
        d: "as a heading for tables",
        correct: "b",
    },
    {
        question: "Which attribute must have a unique value each time it is used in an HTML document?",
        a: "title",
        b: "class",
        c: "style",
        d: "id",
        correct: "d",
    },
    {
        question: "What does the === comparison operator do?",
        a: "It sets one variable equal to another in both value and type",
        b: "It tests for equality of type only",
        c: "It tests for equality of value only",
        d: "It tests for equality of value and type",
        correct: "d",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>  Your score is ${score}/${quizData.length}.</h2>
            `; 
            if (score>=3 ) {
                document.getElementById( "image1" ).style.display = "block";                
            } 
            else {
                document.getElementById( "image2" ).style.display = "block"; 
            }
            // quiz.innerHTML += '<br><button onclick="location.reload()">Reload</button>';      
        }
    }
});
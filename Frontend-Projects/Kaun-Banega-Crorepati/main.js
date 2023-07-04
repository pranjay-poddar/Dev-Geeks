const questions = [
    {
        "question": "This is a sample question?",
        "a": "a",
        "b": "b",
        "c": "c",
        "d": "d",
    },
    {
        "question": "How many months are there in a year?",
        "a": "10",
        "b": "12",
        "c": "24",
        "d": "None of these",
        "ans": "12",
    },
    {
        "question": "How many days are there in a week?",
        "a": "5",
        "b": "15",
        "c": "7",
        "d": "None of these",
        "ans": "7",
    },
    {
        "question": "How many days are there in a year?",
        "a": "365",
        "b": "356",
        "c": "300",
        "d": "None of these",
        "ans": "365",
    },
    {
        "question": "Which number comes after 15?",
        "a": "14",
        "b": "15",
        "c": "16",
        "d": "None of these",
        "ans": "16",
    },
    {
        "question": "How many colours are there in a rainbow?",
        "a": "5",
        "b": "10",
        "c": "7",
        "d": "None of these",
        "ans": "7",
    },
    {
        "question": "We use our ears to ______",
        "a": "See",
        "b": "Hear",
        "c": "Taste",
        "d": "None of these",
        "ans": "Hear",
    },
    {
        "question": "Name the day that comes after Tuesday?",
        "a": "Wednesday",
        "b": "Tuesday",
        "c": "Thrusday",
        "d": "None of these",
        "ans": "Wednesday",
    },
    {
        "question": "How many vowels are there in the English alphabet?",
        "a": "4",
        "b": "5",
        "c": "6",
        "d": "None of these",
        "ans": "5",
    },
    {
        "question": "How many legs does cow have?",
        "a": "2",
        "b": "6",
        "c": "4",
        "d": "None of these",
        "ans": "4",
    },
    {
        "question": "Which sense organ do you use to smell?",
        "a": "Eye",
        "b": "Ear",
        "c": "Nose",
        "d": "Toungue",
        "ans": "Nose",
    },
    {
        "question": "Which part of the plant is brown and below the ground?",
        "a": "Roots",
        "b": "Stem",
        "c": "leaves",
        "d": "Branch",
        "ans": "Roots",
    },
    {
        "question": "Which part of a plant has seeds?",
        "a": "Roots",
        "b": "Stem",
        "c": "leaves",
        "d": "Fruit",
        "ans": "Fruit",
    },
    {
        "question": "Which bird has a far sight and turns its head all the way round?",
        "a": "Owl",
        "b": "Bat",
        "c": "Pigeon",
        "d": "None",
        "ans": "Owl",
    },
    {
        "question": "Which animal has a long neck?",
        "a": "Bear",
        "b": "Fox",
        "c": "Zebra",
        "d": "Giraffe",
        "ans": "Giraffe",
    },
    {
        "question": "Which animal has black and white stripes on its body?",
        "a": "Bear",
        "b": "Fox",
        "c": "Zebra",
        "d": "Giraffe",
        "ans": "Zebra",
    },
    {
        "question": "Name the shape with five sides?",
        "a": "Pentagon",
        "b": "Hexatagon",
        "c": "Square",
        "d": "None",
        "ans": "Pentagon",
    },
]
const levels = ["₹0", "₹1,000", "₹2,000", "₹3,000", "₹5,000", "₹10,000", "₹20,000", "₹40,000", "₹80,000", "₹160,000", "₹320,000", "₹640,000", "₹1,250,000", "₹2,500,000", "₹5,000,000", "₹1 Crore", "₹7 Crore"]
let level = 1
let money
let questionCount = 0
let isGameStart = false
let coundown;

const container = document.querySelector(".container")
const options = document.getElementsByName("opts")
const btn = document.getElementById("btn")
const timer = document.getElementById("timer")
const question = document.getElementById("question")
const info = document.getElementById("info")
const optA = document.getElementById("opt-a")
const optB = document.getElementById("opt-b")
const optC = document.getElementById("opt-c")
const optD = document.getElementById("opt-d")

const gameOver = () => {
    for (let no = 0; no < 4; no++) {
        if(options[no])
        options[no].disabled = true;
    }
}

const startTimer = (sec = 15) => {
    coundown = setInterval(() => {
        if (sec >= 0)
            timer.innerText = `${sec} sec`
        else {
            clearInterval(coundown);
            info.innerHTML = `Time Over! Your Take home money is :<span class="red"> ${money ?? levels[0]} </span>`
            gameOver();
        }
        sec--;
    }, 1000)
}

const unchecked = () => {
    for (let index = 0; index < 4; index++) {
        options[index].checked = false;
    }
}

const render = () => {
    unchecked();
    question.innerText = questions[questionCount].question;
    optA.innerText = questions[questionCount].a
    options[0].value = questions[questionCount].a
    optB.innerText = questions[questionCount].b
    options[1].value = questions[questionCount].b
    optC.innerText = questions[questionCount].c
    options[2].value = questions[questionCount].c
    optD.innerText = questions[questionCount].d
    options[3].value = questions[questionCount].d
    if (isGameStart)
        startTimer();
}

btn.addEventListener('click', (e) => {

    e.preventDefault();
    btn.innerText = "Submit";
    clearInterval(coundown);

    if (!isGameStart) {
        questionCount++;
        isGameStart = true;
        info.innerHTML = `Welcome ! This question is for : <span class="blue"> ${levels[level]} </span>`;
        render();
    }
    else {
        for (let index = 0; index < 4; index++) {
            if (options[index].checked) {
                if (options[index].value == questions[questionCount].ans) {
                    if (level-1 == 4 || level-1 == 10 || level-1 == 16)
                        money = levels[level]
                    questionCount++;
                    level++;
                    if (questionCount<=16) {
                        info.innerHTML = `Congratulations! you won <span class="blue"> ${levels[level - 1]} </span> <br> This question is for : <span class="blue"> ${levels[level]} </span>`;
                        render();
                    }
                    else {
                        info.innerText = "CONGRATULATIONS !"
                        container.innerHTML = ` <div id="won-container">
                        <p id="won-tab-info"> You Have won a amount </p>
                        <p id="won-tab-amount">${money}</p>
                        </div>`
                    }
                }
                else {
                    info.innerHTML = `Thanks For Playing !`;
                    container.innerHTML = ` <div id="won-container">
                        <p id="won-tab-info"> Your Take home money is </p>
                        <p id="won-tab-amount">${money ?? levels[0]}</p>
                        </div>`
                    gameOver();
                }
            break;
            }

        }
    }
}
)


render();
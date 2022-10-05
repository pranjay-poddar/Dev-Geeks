const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];


q = document.getElementById("question");
op1 = document.getElementById("1");
op2 = document.getElementById("2");
op3 = document.getElementById("3");
op4 = document.getElementById("4");
timer = document.getElementById("timer");
list = document.getElementById("list")

container1 = document.getElementsByClassName("container1");
container2 = document.getElementsByClassName("container2");
container3 = document.getElementsByClassName("container3");
container4 = document.getElementsByClassName("container4");
viewScore = document.getElementById("leaderboard");
let i = 0; score = 0; Totaltime = 75;
function getOption(clicked) {


    console.log(clicked);
    if (questions[i].options[clicked - 1] == questions[i].answer) {
        document.getElementById("result").innerText = "CORRECT"
        score += 10;
        console.log("correct");
        document.getElementById("score").innerText = score;
    }
    else {
        document.getElementById("result").innerText = "INCORRECT"
        Totaltime -= 10;
        console.log("Incorrect");
    }
    i++;
    setTimeout(show, 1000);

}
function nextQus() {

    q.innerText = questions[i].questionText;
    op1.innerText = questions[i].options[0];
    op2.innerText = questions[i].options[1];
    op3.innerText = questions[i].options[2];
    op4.innerText = questions[i].options[3];

}
function times() {
    if (Totaltime > 0)
        Totaltime -= 1;
    timer.innerText = Totaltime
    if (Totaltime <= 0) {
        viewe();
    }
}
function show() {

    container1[0].style.display = "none";
    container2[0].style.display = "block";
    container3[0].style.display = "none";
    q.innerText = questions[i].questionText;
    op1.innerText = questions[i].options[0];
    op2.innerText = questions[i].options[1];
    op3.innerText = questions[i].options[2];
    op4.innerText = questions[i].options[3];
    // setInterval(times,1000)
    document.getElementById("result").innerText = " ";
    if (i >= 5 || Totaltime <= 0) {
        i = 0;
        viewe();
        Totaltime = 0;

    }


    console.log("block");
}
function home() {
    Totaltime = 75;
    container1[0].style.display = "block";
    container2[0].style.display = "none";
    container3[0].style.display = "none";
    container4[0].style.display = "none";
    console.log("home");
}
function store() {
    value = document.getElementById("name").value
    localStorage.setItem(value, score)
}
function viewe() {

    container1[0].style.display = "none";
    container2[0].style.display = "none";
    container3[0].style.display = "none";
    container4[0].style.display = "block";

}
function display() {
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        list.innerHTML += i + 1 + "." + key + " -  " + value + '<br>';
        console.log(key + " => " + value);
    }
}
function HighScore() {
    display();
    container1[0].style.display = "none";
    container2[0].style.display = "none";
    container3[0].style.display = "block";
    container4[0].style.display = "none";
}
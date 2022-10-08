const questionNumber = document.querySelector(".question-number");
const questionText =  document.querySelector(".question-text");
const optionContainer =  document.querySelector(".option-container");
const answersIndicatorContainer =  document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const timeCount = document.querySelector(".timer  .timer_sec"); 

let questionLimit= 15; //quiz.length if you want all questions
let questionCounter = 0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswer =0;
let attempts=0;
let counter;
let timeValue=10;

// push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i< totalQuestion;i++){
       availableQuestions.push(quiz[i]);
    }
}
//set new question no, question and options
function getNewQuestion(){
    console.log(availableQuestions);
    console.log(quiz.length);
    //question number
    questionNumber.innerHTML = "Question " + (questionCounter+1)+" of " + questionLimit;

    const questionIndex = availableQuestions[Math.floor(Math.random() *availableQuestions.length)]
    currentQuestion=questionIndex;
    questionText.innerHTML =  currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);//get position of 'questionIndex'

    availableQuestions.splice(index1,1);//removes the question already shown to avoid repetition
    console.log(questionIndex);
    console.log(availableQuestions);
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }
    //length of options array
    const optionLen = currentQuestion.options.length;
    for(let i=0;i<optionLen;i++)
    {
        availableOptions.push(i);
    }

    optionContainer.innerHTML='';
    let animationDelay=0.2;

    for(let i=0;i<optionLen;i++)
    {
        const optionIndex = availableOptions[Math.floor(Math.random() *availableOptions.length)];

        const index2 = availableOptions.indexOf(optionIndex);

        availableOptions.splice(index2,1);//removes options to avoid repetition

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay=animationDelay+'s';
        animationDelay=animationDelay+ 0.1;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++;
}

//result of currently attempted question
function getResult(element){
     clearInterval(counter);
    const id= parseInt(element.id);
    console.log(id);
    //find answer by comparing id of clicked option
    if(id === currentQuestion.answer){
        element.classList.add("correct");//set green colour to correct option
        //add indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswer++;
    }
    else{
        element.classList.add("wrong");//set red colour to incorrect option
        //add indicator to wrong mark
         updateAnswerIndicator("wrong");
        //mark correct option green simultaneously with marking wrong option red
        const optionLen= optionContainer.children.length;
         for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
        }
    }
    }
    attempts++;
    unclickableoptions();
}
//all options unclickable once an option is selected
function unclickableoptions(){
    const optionLen= optionContainer.children.length;
    for(let i=0;i<optionLen;i++)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}
 function answersIndicator(){
    answersIndicatorContainer.innerHTML='';
    const totalQuestion = questionLimit;
    for(let i=0;i<totalQuestion;i++)
     {
        const indicator= document.createElement("div");
         answersIndicatorContainer.appendChild(indicator);
    }
 }
   function  updateAnswerIndicator(markType){
        answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
    }
function next(){
    if(questionCounter === questionLimit){
        console.log("quiz over");
        quizOver();
    }
    else
        getNewQuestion();
        clearInterval(counter);
        startTimer(timeValue);
}
function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML= questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML= attempts;
    resultBox.querySelector(".total-correct").innerHTML= correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML=attempts-correctAnswer;
    let percentage= correctAnswer/questionLimit;
    resultBox.querySelector(".percentage").innerHTML=percentage.toFixed(4)*100+"%";
    resultBox.querySelector(".total-score").innerHTML= correctAnswer +" / "+questionLimit;
}
function resetQuiz(){
    questionCounter=0;
    correctAnswer=0;
    attempts=0;
    availableQuestions=[];
    clearInterval(counter);
}
function tryAgainQuiz(){
    //hide result box
    resultBox.classList.add("hide");
    //showing quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    //hide result box
    resultBox.classList.add("hide");
    //showing quiz box
    homeBox.classList.remove("hide");
    resetQuiz();
}

function startQuiz(){

    homeBox.classList.add("hide");//hide homebox on start
    quizBox.classList.remove("hide");//show quiz box on start
    setAvailableQuestions();
    getNewQuestion();
    startTimer(timeValue);
    answersIndicator();
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent=time;
        time--;
        if(time<9)
        {
            let addZero = timeCount.textContent;
            timeCount.textContent="0"+ addZero;
        }
        if(time<0)
        {
            clearInterval(counter);
            timeCount.textContent="00";
            next();
        }
    }
}

window.onload = function(){
    homeBox.querySelector(".total-questions").innerHTML = questionLimit;
}
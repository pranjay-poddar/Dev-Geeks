document.getElementById("main").style.display="none";
let q1=document.getElementById("q1")
let op1=document.getElementById("op1");
let op2=document.getElementById("op2");
let op3=document.getElementById("op3");
let op4=document.getElementById("op4")
let c1=document.getElementById("c1");


let q2=document.getElementById("q2")
let o1p1=document.getElementById("1op1");
let o1p2=document.getElementById("1op2");
let o1p3=document.getElementById("1op3");
let o1p4=document.getElementById("1op4")
let c2=document.getElementById("c2");


let q3=document.getElementById("q3")
let o2p1=document.getElementById("2op1");
let o2p2=document.getElementById("2op2");
let o2p3=document.getElementById("2op3");
let o2p4=document.getElementById("2op4")
let c3=document.getElementById("c3");


let q4=document.getElementById("q4")
let o3p1=document.getElementById("3op1");
let o3p2=document.getElementById("3op2");
let o3p3=document.getElementById("3op3");
let o3p4=document.getElementById("3op4")
let c4=document.getElementById("c4");
let ok3=document.getElementById("ok3");
ok3.addEventListener("click",function(){
    document.getElementById("main").style.display="flex";
    document.getElementById("main2").style.display="none";
     let question1=q1.value;
     let option1=op1.value;
     let option2=op2.value;
     let option3=op3.value;
     let option4=op4.value;
     let correct1=c1.value;

     let question2=q2.value;
     let option12=o1p1.value;
     let option22=o1p2.value;
     let option32=o1p3.value;
     let option42=o1p4.value;
     let correct2=c2.value;

     let question3=q3.value;
     let  option13=o2p1.value;
     let  option23=o2p2.value;
     let  option33=o2p3.value;
     let  option43=o2p4.value;
     let   correct3=c3.value;

     let   question4=q4.value;
     let  option14=o3p1.value;
     let  option24=o3p2.value;
    let  option34=o3p3.value;
    let  option44=o3p4.value;
    let  correct4=c4.value;
console.log(question1);
const quizData = [{
    question:question1,
    a: option1,
    b: option2,
    c: option3,
    d: option4,
    correct:correct1,
},
{
    question:question2,
    a: option12,
    b: option22,
    c: option32,
    d: option42,
    correct:correct2,
},
{
    question:question3,
    a: option13,
    b: option23,
    c: option33,
    d: option43,
    correct:correct3,
},
{
   
    question:question4,
    a: option14,
    b: option24,
    c: option34,
    d: option44,
    correct:correct4,
   
}
];

let index = 0;
let correct = 0,
incorrect = 0,
total = quizData.length;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']")
const loadQuestion = () => {
if (total === index) {
    return quizEnd()
}
reset()
const data = quizData[index]
questionBox.innerHTML = `${index + 1}) ${data.question}`
allInputs[0].nextElementSibling.innerText = data.a
allInputs[1].nextElementSibling.innerText = data.b
allInputs[2].nextElementSibling.innerText = data.c
allInputs[3].nextElementSibling.innerText = data.d
}

document.querySelector("#submit").addEventListener(
"click",
function() {
    const data = quizData[index]
    const ans = getAnswer()
    if (ans === data.correct) {
        correct++;
    } else {
        incorrect++;
    }
    index++;
    loadQuestion()
}
)

const getAnswer = () => {
let ans;
allInputs.forEach(
    (inputEl) => {
        if (inputEl.checked) {
            ans = inputEl.value;
        }
    }
)
return ans;
}

const reset = () => {
allInputs.forEach(
    (inputEl) => {
        inputEl.checked = false;
    }
)
}

const quizEnd = () => {
// console.log(document.getElementsByClassName("container"));
document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col">
    <h3>Thank you for giving the quiz 😊
    </h3>
    <br>
        <h3 class="w-100"> Hii, you've scored ${correct} / ${total} </h3>
    </div>
`
}
loadQuestion(index);
})

const Head = document.querySelector(".head");
const Tail = document.querySelector(".tail");
const toss= document.querySelector(".btn");
const flipAnimation = document.querySelector(".flip");

function Init(){
    Tail.classList.remove("active");
    flipAnimation.classList.remove("active");
    Head.classList.remove("active");
}

function Flipanimation(){
    Init();
    flipAnimation.classList.add("active");
    setTimeout(DecisionMaker,4200);
}

function DecisionMaker(){
    let Number = Math.round(Math.random()*7); 
    console.log(Number);
    
    
    if(Number === 0 || Number === 4 ||Number === 2 ){
        flipAnimation.classList.remove("active");
        Tail.classList.remove("active");
        Head.classList.add("active");
    }
    else{
        flipAnimation.classList.remove("active");
        Head.classList.remove("active");
        Tail.classList.add("active");
    }

}

toss.addEventListener("click",Flipanimation);

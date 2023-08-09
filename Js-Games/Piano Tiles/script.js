const start = document.querySelector(".start");
const game = document.querySelector("#game");
const sco   = document.getElementById("score");
const audio = document.getElementById("audio");
const ply = document.getElementById("play");
const out = document.getElementById("out");
const results = document.getElementById("result");
const result_box = document.querySelector(".result_box");
const restart = result_box.querySelector(".restart");
const text = result_box.querySelector(".score_text");
let a;
let tos = 2400;
let bool1 = bool2 = bool3 = bool4 = true;
var count=1;
var score = 0;
var step = 0;
var mar=randomMargin(), mar2;

function viewResult(){
  game.style.display = "none";
  results.play();
  result_box.classList.add("activeResult");
  text.innerText = "You've scored " + score + " points";
}

restart.onclick = ()=>{
  start.style.display = "block";
  result_box.classList.remove("activeResult");
  sco.innerText = 0;
  audio.currentTime = 0;
}

function startAudio(){
  audio.play();
}
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play();
});

function speed(e){
  a = setInterval(appendDiv, e);
}
function reset(){
  bool1 = bool2 = bool3 = bool4 = true;
}
function outs(){
  audio.pause();
  out.play();
  setTimeout(viewResult, 1000);
}

function appendDiv(){
  var ob = document.createElement("div");

  do{mar2 = randomMargin()}
  while(mar == mar2){mar = mar2}

  ob.style.marginLeft = mar2+"%";
  setTimeout(moveDown, 100, ob);
  ob.onclick = () =>{
    ob.style.background = "rgba(0,0,0,0.2)"
    updateScore();
  }
  if(score >= 70 && score < 150) step = 1;
  else if(score >= 150 && score < 400) step = 2;
  else if(score >= 400 && score < 800) step = 3;
  else if(score >= 800) step = 4;
  document.getElementById("tiles").prepend(ob);
}

function randomMargin(){return 25*Math.floor(Math.random()*4)}

function moveDown(e){
  e.classList.add("move");
  if(step == 1){
    e.classList.add("speedX1");
    if(bool1 == true){
      clearInterval(a);
      speed(300);
      reset();
      bool1 = false;
      tos = 1600;
    }
  } 
  else if(step == 2){
    e.classList.add("speedX2");
    if(bool2 == true){
      clearInterval(a);
      speed(250);
      reset();
      bool2 = false;
      tos = 1600;
    }
  }
  else if(step == 3){
    e.classList.add("speedX3");
    if(bool3 == true){
      clearInterval(a);
      speed(200);
      reset();
      bool3 = false;
      tos = 1200;
    }
  } else if(step == 4){
    e.classList.add("speedX4");
    if(bool4 == true){
      clearInterval(a);
      speed(160);
      reset();
      bool4 = false;
      tos = 1000;
    }
  }
  setTimeout(removeDiv, tos, e)
}

function updateScore(){
  score++;
  sco.innerText = score;
}

function removeDiv(e){
  var bg = e.style.background;
  if(bg == ""){
    clearInterval(a);
    outs();
  }
  e.remove()
}

start.querySelector("button").onclick = ()=>{
  ply.play();
  game.style.display = "block";
  start.style.display = "none";
  score = 0;
  speed(400);
  setTimeout(startAudio, 1000);
}
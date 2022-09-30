const fruits = ['carrot', 'cherry', 'apple', 'pineapple', 'pumpkin', 'strawberry']
const box = document.querySelector('.box')
const mes = document.querySelector('.mes')
const score = document.querySelector('.sc')
const second = document.querySelector('.second')
const sec = document.querySelector('audio[data-key="seconds"]')
const select = document.querySelector('audio[data-key="select"]')
const wrong = document.querySelector('audio[data-key="wrong"]')
const correct = document.querySelector('audio[data-key="correct"]')
const yay = document.querySelector('audio[data-key="yay"]')
const lose = document.querySelector('audio[data-key="lose"]')
let tim;
let timer;

fruits.push(...fruits)

function shuffle(arr) {
  var val1 = arr.length, temp, index;
  while (val1 > 0) {
    index = Math.floor(Math.random() * val1);
    val1--;
    temp = arr[val1];
    arr[val1] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

window.onload = init;

function init() {
  var divs = (shuffle(fruits))
  for (var x = 0; x < divs.length; x++) {
    box.innerHTML += `
      <div class='placer ${x}'>
        <div class='holder ${divs[x]}'>
          <div class='front'></div>
          <img  class='back' src='libs/img/${divs[x]}.png'>
        </div>
      </div>
    `
  }
  showBox();
}

function showBox() {
  mes.addEventListener('click', ready)
}

function ready() {
  var a = box.children;
  this.innerHTML = 'Ready!'
  tim = new Date().getTime() + 30000
  timer = setInterval(setDate, 1000)
  for (var x = 0; x < a.length; x++) {
    a[x].addEventListener('click', click);
  }
}


var selectedImg = []
function click() {
  var b = this.firstElementChild;
  let c = this.firstElementChild.firstElementChild.nextElementSibling
  c.style.zIndex = 15
  b.classList.add('flip');
  evaluator(this, c);
}

var selectedBox = [];
function evaluator(a, c) {
  select.play()

  if (a.classList[1] === undefined) {
    return
  }

  selectedBox.push(a);
  selectedImg.push(c)

  if (selectedBox.length === 1) {
    mes.innerHTML = "Be sure!";
  }

  if (selectedBox.length === 2) {
    if (selectedBox[0].firstElementChild.classList[1] == selectedBox[1].firstElementChild.classList[1]) {
      removePic(selectedBox)
      selectedBox = [];

      
      selectedImg = []
    } else {
      hidePic(selectedBox);
      selectedBox = [];
    }
  }
}

var scoreCard = 1;
function scoreBoard() {
  score.innerHTML = scoreCard++;
  score.classList.add('addSc')
  if (scoreCard === 7) {
    endGame()
  }
  removeCss(score, 'addSc')
}

function endGame() {
  setTimeout(function () {
    mes.innerHTML = `
      <div>You win!</div>
      <div>Start again.</div>
    `
    clearInterval(timer)
    var a = box.children
    for (var x = 0; x < a.length; x++) {
      a[x].removeEventListener('click', click);
    }
    mes.addEventListener('click', reset)
    yay.play()
  }, 700)
}

function reset() {
  window.location.reload(true)
}

function removeCss(element, cssName) {
  setTimeout(function () {

    element.classList.remove(cssName)
  }, 700)
}


function removePic(a) {
  a[0].classList.remove(a[0].classList[1])
  a[1].classList.remove(a[1].classList[1])
  setTimeout(function () {
    correct.play()
    mes.innerHTML = 'Great Job!';
    scoreBoard();
  }, 700)
}

function hidePic(a ) {
  setTimeout(function () {
    for (var x = 0; x < 2; x++) {
      a[x].firstElementChild.classList.remove('flip')
    }
    mes.innerHTML = "Wrong!";
    wrong.play()
    selectedImg[0].style.zIndex = 0
    selectedImg[1].style.zIndex = 0
    selectedImg = []
  }, 700)
}




function setDate() {
  var newTime = new Date().getTime()
  var remainingTime = tim - newTime
  var remTime = Math.ceil(remainingTime / 1000)
  second.innerHTML = remTime
  second.classList.add('timeStyle')
  mes.removeEventListener('click', ready)
  sec.play()
  if (remTime === 0) {
    mes.innerHTML = `
      <div>You lose!</div>
      <div>Play again.</div>
    `
    clearInterval(timer)
    var a = box.children
    for (var x = 0; x < a.length; x++) {
      a[x].removeEventListener('click', click);
    }
    lose.play()
    mes.addEventListener('click', reset)
  }
  removeCss(second, 'timeStyle')
}


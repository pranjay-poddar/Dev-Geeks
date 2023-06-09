var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
let color = "#000";
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;
let brushthickness = 7;
const erase = () => (ctx.globalCompositeOperation = "destination-out");
//set current color
document.querySelector(".color-btn div").style.backgroundColor = color;

resize();

function sizeList() {
  document.querySelector(".size-list").classList.toggle("show-list");
  brushSize();
}

// Set brush Size

function brushSize() {
  var brushSet = document.getElementsByClassName("size");
  Array.prototype.forEach.call(brushSet, function (element) {
    element.addEventListener("click", function () {
      brushthickness = element.getAttribute("style").substr(11, 2);
      console.log(brushthickness);
    });
  });
}

//Set Color Palette

function setActiveColor() {
  document.querySelector(".color-btn div").style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.globalCompositeOperation = "source-over";
}

//Set Color To Brush

function setColor() {
  var palette = document.getElementsByClassName("color");
  Array.prototype.forEach.call(palette, function (element) {
    element.addEventListener("click", function () {
      color = element.getAttribute("style").split("--set-color:")[1];
      setActiveColor();
    });
  });
}

//Color Picker
function colorPick() {
  color = document.getElementById("color-picker").value;
  setActiveColor();
}

//Resize Canvas


function resize() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

//Set Cursor Position

// initialize position as 0,0
var pos = { x: 0, y: 0 };

// new position from mouse events

function setPosition(e) {
  pos.x = parseInt(e.clientX - offsetX);
  pos.y = parseInt(e.clientY - offsetY);
}

//Draw

function draw(e) {
  if (e.buttons !== 1) return; // if mouse is not clicked, do not go further

  ctx.beginPath(); // begin the drawing path
  ctx.lineWidth = brushthickness; // width of line
  ctx.lineCap = "round"; // rounded end cap
  ctx.strokeStyle = color; // hex color of line
  ctx.moveTo(pos.x, pos.y); // from position
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to position
  ctx.closePath();
  ctx.stroke(); // draw it!
}

// Download Canvas

function onSave() {
  const link = document.createElement('a');
  link.download = 'sketch.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);

// add event listeners to trigger on different mouse events
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
document.addEventListener("touchmove", draw);
document.addEventListener("touchend", setPosition);
document.addEventListener("touchstart", setPosition);
document.getElementById("color-picker").addEventListener("change", colorPick);
setColor();
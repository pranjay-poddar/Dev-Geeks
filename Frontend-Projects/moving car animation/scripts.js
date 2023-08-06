// importing classes and ids in javascript file 
let frontWheel = document.getElementById("frontwheel");
let rearWheel = document.getElementById("rearwheel");
let btn = document.querySelector(".btn");
let container = document.querySelector(".container");

// onclick function (car's speed)
function speed1(){
    frontWheel.style.animation = "rotate 1.5s linear infinite";
    rearWheel.style.animation = "rotate 1.5s linear infinite";
    container.style.backgroundImage = "url(https://drive.google.com/uc?export=view&id=1eWs0HfASfi4Fu2NHyWJIckvbtZqPqcsz)";
}

function speed2(){
    frontWheel.style.animation = "rotate 1s linear infinite";
    rearWheel.style.animation = "rotate 1s linear infinite";
    container.style.backgroundImage = "url(https://drive.google.com/uc?export=view&id=1eWs0HfASfi4Fu2NHyWJIckvbtZqPqcsz)";
}

function speed3(){
    frontWheel.style.animation = "rotate 0.8s linear infinite";
    rearWheel.style.animation = "rotate 0.8s linear infinite";
    container.style.backgroundImage = "url(https://drive.google.com/uc?export=view&id=1eWs0HfASfi4Fu2NHyWJIckvbtZqPqcsz)";
}

function speed4(){
    frontWheel.style.animation = "rotate 0.4s linear infinite";
    rearWheel.style.animation = "rotate 0.4s linear infinite";
    container.style.backgroundImage = "url(https://drive.google.com/uc?export=view&id=1eWs0HfASfi4Fu2NHyWJIckvbtZqPqcsz)";
}

function speed5(){
    frontWheel.style.animation = "rotate 0.1s linear infinite";
    rearWheel.style.animation = "rotate 0.1s linear infinite";
    container.style.backgroundImage = "url(https://drive.google.com/uc?export=view&id=1eWs0HfASfi4Fu2NHyWJIckvbtZqPqcsz)";
}

// onclick function for stop the car

function stopCar(){
    frontWheel.style.animation = "rotate 0s linear infinite";
    rearWheel.style.animation = "rotate 0s linear infinite";
    container.style.backgroundImage = "url(https://drive.google.com/uc?export=view&id=1b9Jo5tSNEqwChBAyU1SzK1u0lmGBvB39)";
}
// Initialsing global variables
const car = document.querySelector('.car');

// Initialising audio variables
var audio = document.createElement("audio");
car.appendChild(audio);
audio.src = "https://drive.google.com/uc?export=download&id=1TDCST94uE1b4mL1MOHLhOXBGfP_Hdhuq"

// for pc
car.addEventListener("mousemove", function () {
    audio.play();
});

// for mobile devices
car.addEventListener('touchmove', function () {
    audio.play();
});

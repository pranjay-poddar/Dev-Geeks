var kitty = document.querySelector("#kitty");
var pepper = document.querySelector("#pepper");
var counter = 0;
let highScore = 0;
let start = document.getElementById("start");

pepper.style.webkitAnimationPlayState = "paused";

function jump(){
    if(kitty.classList == "animate"){return}
    kitty.classList.add("animate");
    setTimeout(function(){
        kitty.classList.remove("animate");
    },300);
}

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32 || e.keyCode === 38) {
        jump();
    }
});

start.onclick = function(){
    pepper.style.webkitAnimationPlayState = "running";
    start.style.display = "none";
    var game = setInterval(function() {
        let kittyTop = parseInt(window.getComputedStyle(kitty).getPropertyValue("top"));
        let pepperLeft = parseInt(window.getComputedStyle(pepper).getPropertyValue("left"));
        if(pepperLeft<20 && pepperLeft>-20 && kittyTop>=130){
            pepper.style.animation = "none";
            counter=0;
            pepper.style.animation = "pepper 1s infinite linear";
        }else{
            counter++;
            let score = Math.floor(counter/100);
            document.getElementById("score").innerHTML = score
            if(highScore < score) {
                highScore = score;
                document.getElementById("highScore").innerHTML = highScore;
            }
        }
    }, 10);
}

document.body.onkeyup = function(e){
    if(e.keyCode == 13){
        pepper.style.webkitAnimationPlayState = "running";
    start.style.display = "none";
    var game = setInterval(function() {
        let kittyTop = parseInt(window.getComputedStyle(kitty).getPropertyValue("top"));
        let pepperLeft = parseInt(window.getComputedStyle(pepper).getPropertyValue("left"));
        if(pepperLeft<20 && pepperLeft>-20 && kittyTop>=130){
            pepper.style.animation = "none";
            counter=0;
            pepper.style.animation = "pepper 1s infinite linear";
        }else{
            counter++;
            let score = Math.floor(counter/100);
            document.getElementById("score").innerHTML = score
            if(highScore < score) {
                highScore = score;
                document.getElementById("highScore").innerHTML = highScore;
            }
        }
    }, 10);
    }
}


var css = document.querySelector("h3");
var linearGradient1 = document.querySelector(".linearGradient1");
var linearGradient2 = document.querySelector(".linearGradient2");
var body = document.getElementById("gradient");

function addGradient()
{
    body.style.background = "linear-gradient(to right, " + linearGradient1.value + ", " + linearGradient2.value + ")";  
    
    css.textContent = body.style.background + ";";
}

linearGradient1.addEventListener("input", addGradient);
linearGradient2.addEventListener("input", addGradient);
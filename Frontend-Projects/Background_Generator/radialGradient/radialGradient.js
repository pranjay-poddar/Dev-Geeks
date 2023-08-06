var css = document.querySelector("h3");
var radialGradient1 = document.querySelector(".radialGradient1");
var radialGradient2 = document.querySelector(".radialGradient2");
var body = document.getElementById("gradient");

function addRadialGradient()
{
    body.style.background = "radial-gradient(" + radialGradient1.value + ", " + radialGradient2.value + ")";
    css.textContent = body.style.background + ";";
}

radialGradient1.addEventListener("input", addRadialGradient);
radialGradient2.addEventListener("input", addRadialGradient);
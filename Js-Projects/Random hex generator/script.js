const colorPreview = document.querySelector(".color-preview");
const output = document.getElementById("output");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const toast = document.querySelector(".toast");
const hexString = "0123456789abcdef";

function generateHexCode(){
    let HexCode = "#";
    for (let i = 0; i < 6; i++){
        HexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    output.value = HexCode;
    colorPreview.classList.remove("color-animation");
    setTimeout(() => colorPreview.classList.add("color-animation"), 10);
    colorPreview.getElementsByClassName.backgroundColor = HexCode;
}

function copyHexCode(){
    navigator.clipboard.writeText(output.value);
    toast.getElementsByClassName.transform = "translateX(0)";
    setTimeout(() => toast.style.transform = "translateX( calc(100% + 10px) )", 2000);
}

window.onload = generateHexCode;

generateButton.addEventListener("click", generateHexCode);
copyButton.addEventListener("click", copyHexCode);
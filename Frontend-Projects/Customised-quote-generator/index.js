import { generateTextAndImage } from "./utils.js"

const quoteSpan = document.querySelector(".quote-span");
const quoteWrapper = document.querySelector(".quote-wrapper");
const nameSpan = document.querySelector(".name-span");
const image = document.querySelector(".avatar");
const tryagainBtn = document.querySelector("#tryagain");
const obj = document.querySelector("#inputcontent");
const result = document.querySelector(".result");

nameSpan.style.display = "none"
quoteWrapper.style.display = "none"
document.body.style.backgroundImage = 'url("background.jpg")'
quoteSpan.style.display = "none"
image.style.display = "none" 
tryagainBtn.style.display = "none"

document.getElementById("choiceBtn").addEventListener("click", myFunction);
function myFunction() {
    let name = document.getElementById("name").value;
    let favoriteActivity = document.getElementById("favactivity").value;
    let favoritePlace = document.getElementById("favplace").value;
    let temperature = parseInt(document.getElementById("random").value);

    generateTextAndImage(name, favoriteActivity, favoritePlace, temperature);
}

tryagainBtn.addEventListener("click" , tryAgainFunction ) ;

function tryAgainFunction(){
    obj.style.display = "block";
    result.style.display="none";
    document.body.style.backgroundImage = 'url("background.jpg")'
    document.querySelector(".header").style.display = "inline";
    document.getElementById("name").value = "";
    document.getElementById("favactivity").value = "";
    document.getElementById("favplace").value = "";
    document.getElementById("random").value = "";

}




// 1. Change the value of the variable to your name
// let name = "Guil Hernandez"

// // 2. Change the value of the variable to your favorite activity
// let favoriteActivity = "kayaking"

// // 3. Assign the favoritePlace variable your favorite place
// // I.e. city, mountain, pub, forrest, beach, Manhattan, etc.
// let favoritePlace = "florida keys"

// // 4. Configure the AI by setting a temperature from 0 to 1
// // The higher temperature, the more random & experimental output
// let temperature = 1

// // Optional: delete "avatar.jpg" and add a photo of yourself
// // (remember to use "avatar.jpg" as the name of your photo)

// generateTextAndImage(name, favoriteActivity, favoritePlace, temperature)


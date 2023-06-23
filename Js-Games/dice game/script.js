

let randomNo1 = Math.floor(Math.random() * 6) + 1
let randomImg = "dice" + randomNo1 + ".png"
let randomImage = "./" + randomImg;
let img1 = document.querySelectorAll("img")[0]
img1.setAttribute("src", randomImage);
let randomNo2 = Math.floor(Math.random() * 6) + 1
let randomImage2 = "./dice" + randomNo2 + ".png";
let img2 = document.querySelectorAll("img  ")[1]
img2.setAttribute("src", randomImage2);
if(randomNo1 > randomNo2 ){
    document.querySelector("h1").innerHTML="🚩Player 1 Is Win!!"
}
 if(randomNo1 < randomNo2){
    document.querySelector("h1").innerHTML="Player 2 Is Win!!🚩"

}
if(randomNo1 == randomNo2){
    document.querySelector("h1").innerHTML="Draw the Game!!"

}
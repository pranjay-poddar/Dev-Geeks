var randomVar1 = (Math.floor(Math.random() * 6)) + 1;
var randomDice1 = "dice" + randomVar1 + ".png";
var randomImage1 = "images/" + randomDice1;
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src", randomImage1);

var randomVar2 = (Math.floor(Math.random() * 6)) + 1;
var randomDice2 = "dice" + randomVar2 + ".png";
var randomImage2 = "images/" + randomDice2;
var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randomImage2);

if(randomVar1 > randomVar2){
    document.querySelector("h1").innerHTML = "Player1 wins.";
}
else if(randomVar1 < randomVar2){
    document.querySelector("h1").innerHTML = "Player2 wins.";
}
else{
    document.querySelector("h1").innerHTML = "Draw";
}
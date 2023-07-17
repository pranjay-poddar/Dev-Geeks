var drum_index = document.querySelectorAll(".drum").length; //because counting length;
let drum_value = document.querySelectorAll(".drum"); // it's the value because it's not counting anything

// loop to click every single button
for (var i = 0; i < drum_index; i++) {
  drum_value[i].addEventListener("click", function () {
    let btnClick = this.innerHTML;
    makeSound(btnClick);
   
  })
}
document.addEventListener("keypress", function(e){
  makeSound(e.key);
  if(e != makeSound){
    document.querySelector('footer').innerHTML="<p>Nice you're playing good &#x2713</p>";
  }
});

const makeSound = (key) => {
  switch (key) {
    case "l":
      let Repeat1 = new Audio("sounds/tom-1.mp3");
      Repeat1.play();
      break;
    case "a":
      let Repeat2 = new Audio("sounds/crash.mp3");
      Repeat2.play();
      break;
    case "k":
      let Repeat3 = new Audio("sounds/tom-2.mp3");
      Repeat3.play();
      break;
    case "d":
      let Repeat4 = new Audio("sounds/tom-3.mp3");
      Repeat4.play();
      break;
    case "j":
      let Repeat5 = new Audio("sounds/tom-4.mp3");
      Repeat5.play();
      break;
    case "s":
      let Repeat6 = new Audio("sounds/snare.mp3");
      Repeat6.play();
      break;
    case "w":
      let Repeat7 = new Audio("sounds/crash.mp3");
      Repeat7.play();
      break;
    case "L":
      let sound1 = new Audio("sounds/tom-1.mp3");
      sound1.play();
      break;
    case "A":
      let sound2 = new Audio("sounds/crash.mp3");
      sound2.play();
      break;
    case "K":
      let sound3 = new Audio("sounds/tom-2.mp3");
      sound3.play();
      break;
    case "D":
      let sound4 = new Audio("sounds/tom-3.mp3");
      sound4.play();
      break;
    case "J":
      let sound5 = new Audio("sounds/tom-4.mp3");
      sound5.play();
      break;
    case "S":
      let sound6 = new Audio("sounds/snare.mp3");
      sound6.play();
      break;
    case "W":
      let sound7 = new Audio("sounds/crash.mp3");
      sound7.play();
      break;

    default:
      console.log(key);
      break;
  }
}




// Done

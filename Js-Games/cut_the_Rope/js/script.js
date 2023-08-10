const rope = document.querySelector(".rope");
const candy = document.querySelector(".candy");
const retryContainer = document.querySelector(".retry-container");
const retryButton = document.querySelector(".retry-button");

let isLeftButtonPressed = false;

document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    isLeftButtonPressed = true;
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    isLeftButtonPressed = false;
  }
});

rope.addEventListener("mouseover", function () {
  if (isLeftButtonPressed) {
    document.body.style.cursor = "url(https://drive.google.com/file/d/11WSo-OsaABUMoyJz2xnB-RoeYqubQBV5/view?usp=sharing), auto";
    rope.style.width = "0";
    rope.style.animation = "cut-animation 0.2s linear";
    candy.style.bottom = "-50px";
    candy.style.animation = "falling 1s ease-in-out forwards";
  }
});

candy.addEventListener("animationend", () => {
  retryContainer.style.display = "block";
});

retryButton.addEventListener("click", () => {
  window.location.reload();
});

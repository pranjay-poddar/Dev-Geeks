let calcScrollValue = () => {
  let scrollProg = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProg.style.display = "grid";
  } else {
    scrollProg.style.display = "none";
  }
  scrollProg.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProg.style.background = `conic-gradient(#D367CB ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

var copy = document.querySelector(".button-slide").cloneNode(true);
document.querySelector(".experience").appendChild(copy);
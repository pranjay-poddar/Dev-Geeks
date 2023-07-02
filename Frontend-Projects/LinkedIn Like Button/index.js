let like = document.getElementById("like");
let likeCard = document.getElementById("like-card");

let likeIcon = document.getElementById("like-icon");
let celebrateIcon = document.getElementById("celebrate-icon");
let supportIcon = document.getElementById("support-icon");
let loveIcon = document.getElementById("love-icon");
let insightfulIcon = document.getElementById("insightful-icon");
let funnyIcon = document.getElementById("funny-icon");

like.addEventListener("mouseenter", () => {
  likeCard.style.display = "block";
  likeCard.style.display = "flex";
});

likeCard.addEventListener("mouseleave", () => {
  likeCard.style.display = "none";
});

likeIcon.addEventListener("click", () => {
  changeIcon(likeIcon.src)
});

celebrateIcon.addEventListener("click", () => {
  changeIcon(celebrateIcon.src)
});

supportIcon.addEventListener("click", () => {
  changeIcon(supportIcon.src)
});

loveIcon.addEventListener("click", () => {
  changeIcon(loveIcon.src)
});

insightfulIcon.addEventListener("click", () => {
  changeIcon(insightfulIcon.src)
});

funnyIcon.addEventListener("click", () => {
  changeIcon(funnyIcon.src)
});

function changeIcon(src) {
  like.textContent = "";
  let img = document.createElement("img");
  img.setAttribute("src",src);
  img.setAttribute("height", "40px");
  like.appendChild(img);
}

like.addEventListener("click", () => {
  like.textContent = "Like";
});

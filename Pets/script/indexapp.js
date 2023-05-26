
const icon = document.getElementById("icon");

icon.onclick = function(){

  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    icon.src="./image/homepage-img/sun.png";
  }
  else{
    icon.src="./image/homepage-img/moon.png";
  }
}
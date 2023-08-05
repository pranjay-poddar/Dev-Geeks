let btn_cat = document.querySelector(".btn-cat");
let img_cat = document.getElementById("img_cat");
let url = "https://api.thecatapi.com/v1/images/search";

btn_cat.addEventListener("click", function () {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      img_cat.innerHTML = `<img src=${data[0].url} alt="cat" style="width:100%; height:350px;"/>`;
    });
});

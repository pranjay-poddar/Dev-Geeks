const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("res");
const sound = document.getElementById("speech");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWrd = document.getElementById("inp-word").value;
  fetch(`${url}${inpWrd}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `<div class="word">
        <h3>${inpWrd}</h3>
        <button onclick="playSpeech()">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
      </div>
      <p class="word-mean">
        ${data[0].meanings[0].definitions[0].definition}
      </p>
      <p class="example">
        ${data[0].meanings[0].definitions[0].example || ""}
      </p>`;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(()=>{
      result.innerHTML = `<h3 class = "error">Couldn't Find The Word</h3>`;
    });
});

function playSpeech() {
  sound.play();
}
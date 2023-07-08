let inputTextArea = document.getElementById("text-input");
let characCount = document.getElementById("char-count");
let wordCount = document.getElementById("word-count");
let spaceCount = document.getElementById("space-count");
let paragraph = document.getElementById("para-count");
let button = document.getElementById("clr");
let sentence = document.getElementById("sentence-count");
let readingtime = document.getElementById("reading");
let speaking = document.getElementById("speaking");
let caps = document.getElementById("caps");
let f1caps = document.getElementById("fcaps");


inputTextArea.addEventListener("input", function(){

  let txt = inputTextArea.value.trim();
  let countingword = txt.split(/\s+/).filter((item) => item).length;
  let read = Math.floor(countingword * (60/275));
  let speak = Math.floor(countingword *(60/180));
characCount.textContent = (inputTextArea.value.match(/[a-z0-9.]/gi) || []).length;
// g - global , i - capital also
  wordCount.textContent = countingword;
  spaceCount.textContent = inputTextArea.value.split(" ").length -1;
  paragraph.textContent = inputTextArea.value.split("\n").filter((item) => item).length;
  sentence.textContent = inputTextArea.value.split(".").length -1;
  readingtime.textContent = read;
  speaking.textContent = speak;
});

f1caps.addEventListener("click", ()=> {
  const sentences = inputTextArea.value.split(/(?<=[.!?])\s+/);

  const capitalizedSentences = sentences.map((sentence) =>
    sentence.replace(/\w/, (char) => char.toUpperCase())
  ).join(" ");

  inputTextArea.value = capitalizedSentences;
});


caps.addEventListener("click", ()=> {
  let words = inputTextArea.value.split(" ");
  let capitalizedWords = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  let capitalizedParagraph = capitalizedWords.join(" ");
  inputTextArea.value = capitalizedParagraph;

});





button.addEventListener("click", function(){
  inputTextArea.value = '';
  wordCount.textContent = 0;
  spaceCount.textContent = 0;
  paragraph.textContent = 0;
  characCount.textContent = 0;
  sentence.textContent = 0;
  readingtime.textContent = 0;
  speaking.textContent = 0;
});


































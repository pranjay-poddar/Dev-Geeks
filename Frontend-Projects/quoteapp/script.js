const quoteText = document.querySelector(".quote"),
    soundbtn = document.querySelector(".sound"),
    copybtn = document.querySelector(".copy"),
    authorName = document.querySelector(".author .name"),

    quoteBtn = document.querySelector("button");
function randomQuote() {
    //fetching the quotes from API
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        console.log(result)
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
    });
}
//Adding sound functionality
soundbtn.addEventListener("click", ()=>{
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
    speechSynthesis.speak(utterance);
})
//Adding copy button
copybtn.addEventListener("click", ()=>{
   navigator.clipboard.writeText(quoteText.innerText);
})
quoteBtn.addEventListener("click", randomQuote);
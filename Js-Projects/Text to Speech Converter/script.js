const text = document.querySelector('textarea');
const button = document.querySelector('button');
const voice = document.getElementsByName('voice');

let maleVoice = 'Microsoft David - English (United States)';
let femaleVoice = 'Microsoft Zira - English (United States)';

let voices = window.speechSynthesis.getVoices();
// console.log(window.speechSynthesis.getVoices());

button.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(text.value);
    let speakVoice;
    voice.forEach(element => {
        if(element.checked) {
            if(element.value === "male") {
                speakVoice = maleVoice;
            }else {
                speakVoice = femaleVoice;
            }
        }
    });
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === speakVoice) {
            utterance.voice = voices[i];
        }
    }
    window.speechSynthesis.speak(utterance);
    
});

const typingArea = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const showSentence = document.querySelector('#showSentence');
const showTime = document.querySelector('.showTime');

let startTime, endTime, totalTimeTaken, sentenceToWrite;

const sentences = ['The church was white and brown and looked very old.', 'There is not much to do in South Carolina other than sit on a beach.', 'Let all just take a moment to breathe, please!'];


const errorChecking = (words) => {
    // console.log(words);
    let num = 0;
    sentenceToWrite = showSentence.innerHTML;
    sentenceToWrite = sentenceToWrite.trim().split(" ");

    for (let i = 0; i < words.length; i++) {
        if (words[i] === sentenceToWrite[i]) {
            num++;
        }
    }
    return num;
}


const calculateTypingSpeed = (timeTaken) => {
    let totalWords = typingArea.value.trim();
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ");

    actualWords = errorChecking(actualWords);

    if (actualWords !== 0) {
        let typingSpeed = (actualWords / timeTaken) * 60;
        typingSpeed = Math.round(typingSpeed);
        score.innerHTML = `Typing Speed = ${typingSpeed} wpm , Words Wrote = ${actualWords} words , Time-Taken = ${timeTaken} sec`;
    }
    else {
        score.innerHTML = `Typing Speed = 0 wpm , Words Wrote = 0 words , Time-Taken = ${timeTaken} sec`;
    }
}

let intervalID, elapsedTime = 60;

const showTimer = () => {
    if (btn.innerText === "Done") {
        intervalID = setInterval(() => {
            elapsedTime--;
            if (elapsedTime === 0) {
                typingArea.setAttribute('disabled', 'true');
                endTyping();
                elapsedTime = "";
            }
            showTime.innerHTML = elapsedTime;
        }, 1000);
    } else if (btn.innerText === "Start") {
        clearInterval(intervalID);
        elapsedTime = "";
        showTime.innerHTML = elapsedTime;
        elapsedTime = 60;
    }
}

const startTyping = () => {
    let randomNo = Math.floor(Math.random() * sentences.length);
    showSentence.innerHTML = sentences[randomNo];

    let date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";

    elapsedTime = 60;
    showTimer();
}

const endTyping = () => {
    btn.innerText = "Start";

    showTimer();

    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime - startTime) / 1000;

    calculateTypingSpeed(totalTimeTaken);

    showSentence.innerHTML = "";
    typingArea.value = "";

}

btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typingArea.removeAttribute('disabled');
            startTyping();
            score.innerHTML = "";
            break;

        case "done":
            typingArea.setAttribute('disabled', 'true');
            endTyping();
            break;
    }
})

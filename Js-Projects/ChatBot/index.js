// Get the necessary elements from the HTML document
const api = document.getElementById('api-key');
const navbar = document.getElementById('navbar');
const msgBox = document.getElementById('msg-box');
const controls = document.getElementById('bot-controls');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const dropdown = document.getElementById('dropdown');
const voice = document.getElementById('voice');
const startBtn = document.getElementById('start-btn');

// Event listener for the API key input
api.addEventListener('input', () => {
    let API_KEY = api.value;
    api.style.color = 'red';
    if (API_KEY.length === 51 && API_KEY.startsWith('sk-')) {
        api.style.color = 'green';
        setTimeout(startBot, 1500);
    }
});

// Function to switch between text and voice input
function switchTask() {
    const selectedOption = dropdown.value;
    if (selectedOption === 'text') {
        userInput.style.display = '';
        voice.style.display = 'none';
    } else {
        userInput.style.display = 'none';
        voice.style.display = '';
    }
}

// Function to start the chatbot
function startBot() {
    switchTask();
    dropdown.addEventListener('change', switchTask);

    navbar.style.display = 'none';
    msgBox.style.display = '';
    controls.style.display = '';

    sendBtn.addEventListener('click', sendMessage);

    if (dropdown.value === 'text') {
        userInput.addEventListener('keyup', function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    } else {
        userSpeak();
    }
}

// Function to handle user voice input
function userSpeak() {
    // Create a new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    if (startBtn.textContent === 'SPEAK') {
        startBtn.textContent = 'PAUSE';

        recognition.onspeechend = function () {
            // When the user is done speaking
            recognition.stop();
        };

        // This runs when the speech recognition service returns a result
        recognition.onresult = function (event) {
            let transcript = event.results[0][0].transcript;
            if (transcript === '') return;
            displayMessage(transcript, 'user');
            callOpenAPI(transcript);
        };

        // Start recognition
        recognition.start();
    } else {
        startBtn.textContent = 'SPEAK';

        recognition.onspeechend = function () {
            // When the user is done speaking
            recognition.stop();
        };
    }
}

// Function to handle user text input
function sendMessage() {
    const userMsg = userInput.value;

    if (userMsg === '') return;

    // Clear the input field
    userInput.value = '';

    // Display the user message in the chat interface
    displayMessage(userMsg, 'user');

    // Call the OpenAI API to get a response
    callOpenAPI(userMsg);
}

// Function to display a message in the chat interface
function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);

    const imgEle = document.createElement('img');
    const msg = document.createElement('p');

    msg.textContent = message;

    if (sender === 'user') {
        imgEle.src = 'https://github.com/Avdhesh-Varshney/Avdhesh-Varshney/assets/114330097/099ec9df-b7f8-4887-a3ca-43e1947c2684';
        imgEle.alt = 'User-Img';

        messageElement.appendChild(msg);
        messageElement.appendChild(imgEle);
    } else {
        imgEle.src = 'https://github.com/Avdhesh-Varshney/Avdhesh-Varshney/assets/114330097/0545e224-8654-4257-a85c-367a0982fde9';
        imgEle.alt = 'Bot-Img';

        messageElement.appendChild(imgEle);
        messageElement.appendChild(msg);
    }

    msgBox.appendChild(messageElement);

    // Scroll to the bottom of the chat container
    msgBox.scrollTop = msgBox.scrollHeight;
}

// Function to make the API call to OpenAI
async function callOpenAPI(msg) {
    let API_KEY = api.value;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: "user",
                content: msg
            }],
            max_tokens: 100
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        let msg = data.choices[0].message.content;

        // Check if the last sentence is incomplete
        const sentences = msg.split('. ');
        const lastSentence = sentences[sentences.length - 1];
        const lastSentenceEndsWith = ['.', '!', '?'];

        if (lastSentence && lastSentenceEndsWith.includes(lastSentence.charAt(lastSentence.length - 1))) {
            msg = msg;
        } else {
            msg = sentences.slice(0, -1).join('. ') + '.';
        }

        displayMessage(msg, 'bot');
        if (dropdown.value === 'speak') {
            botSpeak(msg);
            userSpeak();
        }
    } catch (error) {
        displayMessage(error, 'bot');
    }
}

// Function to retrieve available voices
function getVoices() {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
        // Sometimes the voices will not be initialized, so we can call speak with an empty string
        // This will initialize the voices
        let utterance = new SpeechSynthesisUtterance("");
        speechSynthesis.speak(utterance);
        voices = speechSynthesis.getVoices();
    }
    return voices;
}

// Function to speak messages
function speak(text, voice, rate, pitch, volume) {
    // Create a SpeechSynthesisUtterance to configure how the text should be spoken
    let speakData = new SpeechSynthesisUtterance();
    speakData.volume = volume; // From 0 to 1
    speakData.rate = rate; // From 0.1 to 10
    speakData.pitch = pitch; // From 0 to 2
    speakData.text = text;
    speakData.lang = 'en';
    speakData.voice = voice;

    // Pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking
    speechSynthesis.speak(speakData);
}

// Function to make the bot speak the response
function botSpeak(msg) {
    if ('speechSynthesis' in window) {
        let voices = getVoices();
        let rate = 1, pitch = 2, volume = 1;
        speak(msg, voices[5], rate, pitch, volume);
    } else {
        displayMessage('Speech Synthesis Not Supported 😞', 'bot');
    }
}

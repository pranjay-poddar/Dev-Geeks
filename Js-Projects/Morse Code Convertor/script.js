const result = document.getElementById("res");
const sound = document.getElementById("speech");
const btn = document.getElementById("convert-btn");
const loadingPage = document.getElementById("loadingPage");
const startPage = document.getElementById("startPage");

// Loading page at the start of the page or at reloading
window.addEventListener('load', () => {
    let ttm = document.getElementById("ttm");
    let mtt = document.getElementById("mtt");

    const handleClick = (event) => {
        let value;
        if (event.target === ttm) {
            value = parseInt(ttm.value);
        } else if (event.target === mtt) {
            value = parseInt(mtt.value);
        }
        startConvertor(value);
        loadingPage.style.display = "none";
        startPage.style.display = "";
    };
    ttm.addEventListener('click', handleClick);
    mtt.addEventListener('click', handleClick);
});

// Convertor program starts from here
function startConvertor(value) {
    let text = document.getElementById("text");
    let inputBox = document.getElementById("inp-word");

    // Activity of placeholder on click in input box
    const inputBoxPlaceholder = inputBox.placeholder;
    inputBox.addEventListener("focus", () => {
        if (inputBox.value === "") {
            inputBox.placeholder = "";
        }
    });
    inputBox.addEventListener("blur", () => {
        if (inputBox.value === "") {
            inputBox.placeholder = inputBoxPlaceholder;
        }
    })

    // Responsive towards keyboard ENTER button
    inputBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            btn.click();
        }
    });

    // Conversion condition
    if (value == 1) {
        text.innerHTML = "Morse Code";
        btn.addEventListener("click", () => {
            let inpText = inputBox.value;
            result.innerHTML = `
      <div class="word">
        <h3>${inpText}</h3>
      </div>
      <p class="word-mean">
        ${textToMorse(inpText)}
      </p>`;
        });
    } else {
        text.innerHTML = "Text";
        btn.addEventListener("click", () => {
            let inpText = document.getElementById("inp-word").value;
            result.innerHTML = `
      <div class="word">
        <h3>${inpText}</h3>
      </div>
      <p class="word-mean">
        ${morseToText(inpText)}
      </p>`;
        });
    }

    // Function to convert text to Morse code
    function textToMorse(text) {
        text = text.toUpperCase();
        let morseCode = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
                morseCode += '/';
            }
            //     Check if that character is present in the morse code dictionary
            else if (MORSE_CODE[char]) {
                morseCode += MORSE_CODE[char] + ' ';
            }
            else {
                // Check if the character is a special character
                const specialCode = SPECIAL_CHARACTERS[char];
                if (specialCode) {
                    morseCode += specialCode + ' ';
                }
            }
        }
        return morseCode.trim();
    }

    // Function to convert Morse code to text
    function morseToText(morseCode) {
        reverseMorseCode();
        const words = morseCode.split('/');
        let text = '';
        for (let i = 0; i < words.length; i++) {
            const word = words[i].trim();
            if (word !== '') {
                const letters = word.split(' ');
                for (let j = 0; j < letters.length; j++) {
                    const letter = letters[j];
                    if (MORSE_CODE_REV[letter]) {
                        text += MORSE_CODE_REV[letter];
                    } else {
                        // Check if the Morse code is a special character
                        for (const key in SPECIAL_CHARACTERS) {
                            if (SPECIAL_CHARACTERS[key] === letter) {
                                text += key;
                                break;
                            }
                        }
                    }
                }
                text += ' ';
            }
        }
        return text.trim();
    }

    // Morse code dictionary
    const MORSE_CODE = {
        'A': '.-',
        'B': '-...',
        'C': '-.-.',
        'D': '-..',
        'E': '.',
        'F': '..-.',
        'G': '--.',
        'H': '....',
        'I': '..',
        'J': '.---',
        'K': '-.-',
        'L': '.-..',
        'M': '--',
        'N': '-.',
        'O': '---',
        'P': '.--.',
        'Q': '--.-',
        'R': '.-.',
        'S': '...',
        'T': '-',
        'U': '..-',
        'V': '...-',
        'W': '.--',
        'X': '-..-',
        'Y': '-.--',
        'Z': '--..',
        '0': '-----',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
    };

    // Reverse Morse code dictionary
    const MORSE_CODE_REV = {};
    function reverseMorseCode() {
        for (const key in MORSE_CODE) {
            const value = MORSE_CODE[key];
            MORSE_CODE_REV[value] = key;
        }
    }

    // Special characters dictionary
    const SPECIAL_CHARACTERS = {
        '.': '.-.-.-',
        ',': '--..--',
        '?': '..--..',
        "'": '.----.',
        '!': '-.-.--',
        '/': '-..-.',
        '(': '-.--.',
        ')': '-.--.-',
        '&': '.-...',
        ':': '---...',
        ';': '-.-.-.',
        '=': '-...-',
        '+': '.-.-.',
        '-': '-....-',
        '_': '..--.-',
        '"': '.-..-.',
        '$': '...-..-',
        '@': '.--.-.',
    };

}
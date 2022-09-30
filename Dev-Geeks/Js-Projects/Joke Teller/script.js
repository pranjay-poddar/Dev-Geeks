const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    // Don't write out API Keys like this, but an exception made here because it's free
    key: 'e985f868e96c46d9b0789c3855350152',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      // If joke's type is "twopart"
      joke = `${data.setup} ... ${data.delivery}`;
    } else  {
      // If joke's type is "single"
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Errors Here
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

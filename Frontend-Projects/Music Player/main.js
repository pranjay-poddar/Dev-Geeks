const audioFile = document.querySelector(".audioupload");
const content = document.querySelector(".content");
const canvas = document.querySelector("canvas");
const audioContext = new AudioContext();
const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const songs = [
  {
    name: "Numb&Frozen",
    title: "Numb & Frozen",
    artist: "Icy Narco",
  },
  {
    name: "Fantasy",
    title: "Fantasy",
    artist: "Bazzi",
  },
  {
    name: "LeaveMeAlone",
    title: "Leave Me Alone",
    artist: "NF",
  },
];

let isPlaying = false;
// for play
const plauMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};
// for pause
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : plauMusic();
});

//   changing the music data
const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  img.src = `assets/${songs.name}.jpg`;
  drawBars(music);
};

songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  plauMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  plauMusic();
};

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

// Analyser
canvas.width = (window.innerWidth * 75) / 100;
canvas.height = (window.innerHeight * 60) / 100;

const canvasCtx = canvas.getContext("2d");

// Analyser(Animation)
function drawBars(audio) {
  audioSource = audioContext.createMediaElementSource(audio);
  analyzer = audioContext.createAnalyser();
  audioSource.connect(analyzer);
  analyzer.connect(audioContext.destination);
  analyzer.fftSize = 128; 

  let bufferLength = analyzer.frequencyBinCount;

  const dataUint8Array = new Uint8Array(bufferLength);

  let barWidth = canvas.width / bufferLength;
  let barHeight;
  let x = 0;

  // Animation
  function animate() {
    x = 0;
 
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height); 
    analyzer.getByteFrequencyData(dataUint8Array);
    // bar height
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataUint8Array[i] * 1.5;
      let r = Math.floor(Math.random() * ((i * barHeight) / 20));
      let g = Math.floor(Math.random() * i);
      let b = Math.floor(Math.random() * ((i * barHeight) / 5));
      canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); 
      x += barWidth + 2;
    }
    // Recall Animation
    requestAnimationFrame(animate);
  }
  animate();
}


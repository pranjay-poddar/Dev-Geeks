import song from "./song.js";

const loader = document.getElementById('loader');
const initialTime = document.getElementById('initialTime');
const totalTime = document.getElementById('totalTime');
const songImg = document.getElementById('songImg');
const songName = document.getElementById('songName');
const playPauseContainer = document.getElementById('playPauseContainer');
const handlePause = document.getElementById('handlePause');
const handlePlay = document.getElementById('handlePlay');
const progressInput = document.getElementById('progressInput');
const mainContainer = document.getElementById('mainContainer');
const playerContainer = document.getElementById('playerContainer');
const handleNext = document.getElementById('handleNext');
const handlePrev = document.getElementById('handlePrev');
const songListContainer = document.getElementById('songListContainer');

const audio = new Audio();
songListContainer.innerHTML = song.map((ele) => `<section class="songList"><span>${ele.name}</span><section class="playingAni"></section></section>`).join("")
let songList = document.querySelectorAll(".songList");

let currentSongId = 1;
let firstPlay = true;
let startHour = "00";
let startMin = "00";
let startSec = "00";
let totalHour = "00";
let totalMin = "00";
let totalSec = "00";

const setTotalTime = (timeInSec) => {
    let time = parseInt(timeInSec)
    let min = parseInt(time / 60);
    totalSec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60).toString() : parseInt(time % 60);
    totalHour = parseInt(min / 60) < 10 ? "0" + parseInt(min / 60).toString() : parseInt(min / 60);
    totalMin = parseInt(min % 60) < 10 ? "0" + parseInt(min % 60).toString() : parseInt(min % 60);
    totalTime.innerText = `${totalHour}:${totalMin}:${totalSec}`;
}

const setInitialTime = (timeInSec) => {
    let time = parseInt(timeInSec)
    let min = parseInt(time / 60);
    startSec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60).toString() : parseInt(time % 60);
    startHour = parseInt(min / 60) < 10 ? "0" + parseInt(min / 60).toString() : parseInt(min / 60);
    startMin = parseInt(min % 60) < 10 ? "0" + parseInt(min % 60).toString() : parseInt(min % 60);
    initialTime.innerText = `${startHour}:${startMin}:${startSec}`;
}

const playSong = (id) => {
    if (firstPlay && !id) {
        audio.src = song[0].song;
        songName.innerText = song[0].name;
        songList[0].lastChild.innerHTML = "<span></span><span></span><span></span>";
        songList[0].lastChild.childNodes.forEach(ele => ele.style.animationPlayState = 'paused');
        firstPlay = false;
    }
    else {
        let currentAudio = song.filter(ele => ele.id === id)
        audio.src = currentAudio[0].song;
        songName.innerText = currentAudio[0].name;
        handlePause.style.display = "block";
        handlePlay.style.display = "none";
        removeAnimation();
        currentSongId = id + 1;
        songList[currentSongId - 1].lastChild.innerHTML = "<span></span><span></span><span></span>";
        songImg.style.animationPlayState = 'running';
        audio.play();
    }

}

const removeAnimation = () => {
    const playingAni = document.querySelectorAll('.playingAni')
    playingAni.forEach(ele => ele.innerHTML = "")
}

setTimeout(() => loader.children[0].innerText = "Something went wrong....", 5000)

playSong();

songList.forEach((ele, index) => ele.addEventListener("click", () => playSong(index)))

handleNext.addEventListener("click", () => {
    if (currentSongId < song.length)
        playSong(currentSongId);
    else
        playSong(0);
})

handlePrev.addEventListener("click", () => {
    // console.log(currentSongId)
    if (currentSongId > 1){
        currentSongId-=2;
        playSong(currentSongId);
    }
})

initialTime.innerText = `${startHour}:${startMin}:${startSec}`;
totalTime.innerText = `${totalHour}:${totalMin}:${totalSec}`;

playPauseContainer.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
    if (audio.paused) {
        songList[currentSongId].lastChild.childNodes.forEach(ele => ele.style.animationPlayState = 'paused')
        handlePause.style.display = "none"
        handlePlay.style.display = "block"
        songImg.style.animationPlayState = 'paused';
    }
    else {
        songList[currentSongId].lastChild.childNodes.forEach(ele => ele.style.animationPlayState = 'running')
        handlePause.style.display = "block"
        handlePlay.style.display = "none"
        songImg.style.animationPlayState = 'running';
    }
})

audio.onloadedmetadata = () => {
    loader.style.display = "none";
    mainContainer.style.display = "flex";
    playerContainer.style.display = "block";
    progressInput.max = audio.duration;
    setTotalTime(audio.duration)
    loader.children[0].innerText = "Loading..."
};

setInterval(() => { progressInput.value = audio.currentTime; setInitialTime(progressInput.value) }, 1000)


progressInput.onchange = () => audio.currentTime = progressInput.value;
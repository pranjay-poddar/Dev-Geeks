// Initialising global variables
let video = document.querySelector("video");

let constraints = {
    video: true,
    audio: true
};

let mediaRecorder;
let buffer = [];

let recordState = false;

let videoRecorder = document.querySelector("#record-video");

let timingELem = document.querySelector(".timing");
let clearObj;

let allFilters = document.querySelectorAll(".filter");
let uiFilter = document.querySelector(".ui-filter");

let zoomIn = document.querySelector(".fa-plus");
let zoomOut = document.querySelector(".fa-minus");

let scale = 1.0;

// Video recorder listeners
navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
        video.srcObject = mediaStream;

        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener('dataavailable', function (e) {
            buffer.push(e.data);
        });
        mediaRecorder.addEventListener('stop', function () {
            let blob = new Blob(buffer, { type: "video/mp4" });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.download = `VID_${getTimeStamp()}.mp4`;
            a.href = url;
            a.click();
            a.remove();
            addMediaToDB(url, "videos");
            buffer = [];
        });
    }).catch(function (err) {
        console.log(err);
    });

// Recording Video
videoRecorder.addEventListener('click', function () {
    if (!mediaRecorder) {
        alert("Permissions not given");
        return;
    }
    if (!recordState) {
        mediaRecorder.start();
        videoRecorder.style.animation = "buttonAnimation 0.75s infinite";
        recordState = true;
        startClock();
    } else {
        mediaRecorder.stop();
        videoRecorder.style.animation = "none";
        recordState = false;
        stopClock();
    }
});

// Get current time stamp for file name
function getTimeStamp() {
    return new Date().getTime();
}

// Filter helper
function getFilter(filter) {
    switch (filter) {
        case "filter-1": return "#cc3838ad";
        case "filter-2": return "#0fbbbbad";
        case "filter-3": return "#8ddb18ad";
        case "filter-4": return "#ee82eead";
        case "filter-5": return "#b8870bad";
        case "filter-6": return "#ffffff00";
    }
}

// Video Recorder Timers
function startClock() {
    timingELem.classList.add("timing-active");
    let timeCount = 0;
    clearObj = setInterval(function () {
        let seconds = (timeCount % 60) < 10 ? `0${timeCount % 60}` : `${timeCount % 60}`;
        let minutes = (timeCount / 60) < 10 ? `0${Number.parseInt(timeCount / 60)}` : `${Number.parseInt(timeCount / 60)}`;
        let hours = (timeCount / 3600) < 10 ? `0${Number.parseInt(timeCount / 3600)}` : `${Number.parseInt(timeCount / 3600)}`;
        timingELem.innerText = `${hours}:${minutes}:${seconds}`;
        timeCount++;
    }, 1000);
}

function stopClock() {
    timingELem.classList.remove("timing-active");
    timingELem.innerText = "00:00:00";
    clearInterval(clearObj);
}

// Filter apply
for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", function () {
        uiFilter.classList.remove(uiFilter.classList[1]);
        uiFilter.classList.add(allFilters[i].classList[1]);
    });
}

// Zoom apply
zoomIn.addEventListener("click", function () {
    if (scale > 1.9)
        return;
    scale += 0.1;
    // -x for mirroring
    video.style.transform = `scale(-${scale}, ${scale})`;
});

zoomOut.addEventListener("click", function () {
    if (scale < 0.5)
        return;
    scale -= 0.1;
    // -x for mirroring
    video.style.transform = `scale(-${scale}, ${scale})`;
});

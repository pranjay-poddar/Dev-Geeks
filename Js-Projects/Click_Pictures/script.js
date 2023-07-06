// Initialising global variables
let video = document.querySelector("video");

let constraints = {
    video: true,
    audio: true
};

let mediaRecorder;
let buffer = [];

let recordState = false;

let captureButton = document.querySelector("#click-image");

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

// Capturing Image
captureButton.addEventListener("click", function () {
    if (!mediaRecorder) {
        alert("Permissions not given");
        return;
    }
    
    // Create a canvas element equal to video frame
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let tool = canvas.getContext("2d");
    
    // Zoom from center
    tool.scale(scale, scale);
    let x = (tool.canvas.width / scale - video.videoWidth) / 2;
    let y = (tool.canvas.height / scale - video.videoHeight) / 2;
    
    // Draw a frame on that canvas
    tool.drawImage(video, x, y);
    
    // translucent 
    tool.globalAlpha = 0.25;
    tool.fillStyle = getFilter(document.querySelector(".ui-filter").classList[1]);
    
    // things are drawn on above layer
    tool.fillRect(0, 0, canvas.width, canvas.height);
    
    // toDataUrl
    let link = canvas.toDataURL();

    // Download
    let anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = `IMG_${getTimeStamp()}.png`;
    anchor.click();
    anchor.remove();
    canvas.remove();
    addMediaToDB(link, "images");
    captureButton.style.animation = "buttonAnimation 0.5s 1";
    setTimeout(() => {
        captureButton.style.animation = "none";
    }, 1000);
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

// Filter apply
for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", function () {
        uiFilter.classList.remove(uiFilter.classList[1]);
        uiFilter.classList.add(allFilters[i].classList[1]);
    })
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

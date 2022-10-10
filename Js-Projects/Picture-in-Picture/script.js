const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        // Catch Error Here
        console.log('whoops, error here: ', error)
    }
}

button.addEventListener('click', async () => {
    // Disable BUtton
    button.disabled = true;
    // Start PIcture in PIcture
    await videoElement.requestPictureInPicture();
    // Reset BUtton
    button.disabled = false;
});

// ON Load
selectMediaStream();
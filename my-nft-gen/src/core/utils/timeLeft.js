import {timeToString} from "./timeToString.js";

export const timeLeft = (startTime, frame, frameInc, numberOfFrames) => {
    let currentTime = new Date();
    let rez = currentTime.getTime() - startTime.getTime();
    let currentFrameCount = (frame / frameInc)
    let timePerFrame = rez / currentFrameCount;
    let timeLeft = (numberOfFrames - currentFrameCount) * timePerFrame;
    timeToString(timeLeft);
}
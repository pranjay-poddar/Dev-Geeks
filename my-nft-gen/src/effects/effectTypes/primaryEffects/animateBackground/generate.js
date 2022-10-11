import {getColorFromBucket, getFinalImageSize, getNeutralFromBucket} from "../../../../core/GlobalSettings.js";
import {animateBackgroundEffect} from "./effect.js";

const finalImageSize = getFinalImageSize();

const config = {
    width: finalImageSize.width,
    height: finalImageSize.height,
    color1: getNeutralFromBucket(),
    color2: getNeutralFromBucket(),
    color3: getColorFromBucket(),
    getInfo: () => {
        return `${animateBackgroundEffect.name}`
    }
}

export const generate = () => {
    return config;
}

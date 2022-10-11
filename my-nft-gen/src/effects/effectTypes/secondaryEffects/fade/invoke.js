import {findValue} from "../../../../core/math/findValue.js";

export const fadeAnimated = async (layer, data, currentFrame, totalFrames) => {
    const opacity = findValue(data.lower, data.upper, data.times, totalFrames, currentFrame)
    await layer.adjustLayerOpacity(opacity);
}

import {findValue} from "../../../../core/math/findValue.js";
import {getRandomIntInclusive} from "../../../../core/math/random.js";

export const blur = async (layer, data, currentFrame, totalFrames) => {
    const theGlitch = getRandomIntInclusive(0, 100);
    if (theGlitch <= data.glitchChance) {
        const blurGaston = Math.floor(findValue(data.lower, data.upper, data.times, totalFrames, currentFrame));
        if (blurGaston > 0) {
            await layer.blur(blurGaston);
        }
    }
}

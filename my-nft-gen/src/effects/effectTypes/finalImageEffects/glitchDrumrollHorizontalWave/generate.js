import {glitchDrumrollHorizontalWaveEffect} from "./effect.js";
import {getFinalImageSize} from "../../../../core/GlobalSettings.js";
import {getRandomIntInclusive} from "../../../../core/math/random.js";

const config = {
    glitchChance: 100,
    glitchOffset: {lower: 40, upper: 80},
    glitchOffsetTimes: {lower: 1, upper: 3},
    cosineFactor: {lower: 2, upper: 6},
}

export const generate = () => {

    const finalImageSize = getFinalImageSize();

    const getRoll = () => {

        const results = [];

        for (let x = 0; x < finalImageSize.width; x++) {
            results.push(Math.random());
        }
        return results;
    }

    const data = {
        glitchChance: config.glitchChance,
        glitchOffset: getRandomIntInclusive(config.glitchOffset.lower, config.glitchOffset.upper),
        glitchOffsetTimes: getRandomIntInclusive(config.glitchOffsetTimes.lower, config.glitchOffsetTimes.upper),
        cosineFactor: getRandomIntInclusive(config.cosineFactor.lower, config.cosineFactor.upper),
        roll: getRoll(),
        getInfo: () => {
            return `${glitchDrumrollHorizontalWaveEffect.name} ${data.glitchChance} chance, ${data.glitchOffset} offset ${data.glitchOffsetTimes} times, cosine factor ${data.cosineFactor}`
        }
    }

    return data;
}
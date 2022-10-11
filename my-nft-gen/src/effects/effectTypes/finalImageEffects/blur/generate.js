import {getRandomIntInclusive} from "../../../../core/math/random.js";
import {blurEffect} from "./effect.js";

const config = {
    lowerRange: {lower: 0, upper: 0},
    upperRange: {lower: 3, upper: 6},
    times: {lower: 1, upper: 3},
    glitchChance: 80,
}

export const generate = () => {

    const data =
        {
            glitchChance: config.glitchChance,
            lower: getRandomIntInclusive(config.lowerRange.lower, config.lowerRange.upper),
            upper: getRandomIntInclusive(config.upperRange.lower, config.upperRange.upper),
            times: getRandomIntInclusive(config.times.lower, config.times.upper),
            getInfo: () => {
                return `${blurEffect.name}: ${data.glitchChance} chance, ${data.times} times, ${data.lower} to ${data.upper}`
            }
        }
    return data;
}

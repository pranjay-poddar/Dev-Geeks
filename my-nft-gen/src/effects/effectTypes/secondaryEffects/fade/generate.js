import {getRandomIntInclusive, randomNumber} from "../../../../core/math/random.js";
import {fadeEffect} from "./effect.js";

const config = {
    lowerRange: {lower: 0.6, upper: 0.8},
    upperRange: {lower: 0.8, upper: 1},
    times: {lower: 1, upper: 6},
}

export const generate = () => {

    const data =
        {
            lower: randomNumber(config.lowerRange.lower, config.lowerRange.upper),
            upper: randomNumber(config.upperRange.lower, config.upperRange.upper),
            times: getRandomIntInclusive(config.times.lower, config.times.upper),
            getInfo: () => {
                return `${fadeEffect.name}: ${data.times} times, ${data.lower.toFixed(3)} to ${data.upper.toFixed(3)}`
            }
        }
    return data;
}